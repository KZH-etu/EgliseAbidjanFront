import { useEffect, useMemo, useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { useTagStore } from "../stores/useTagStore";
import { format } from 'date-fns';
import { useDocumentStore } from "../stores/useDocumentStore";


interface FilterOptions {
  search: string;
  tags: string[];
  author: string;
  publisher: string;
}

const BooksPage = () => {
  const { hasFetched: hasFetchedDocs, fetchAll: fetchDocs } = useDocumentStore();
  const { books, loading: loadingBooks, error: booksError } = useBooks();
  const { items: allTags, hasFetched: hasFetchedTags, fetchAll: fetchTags } = useTagStore();

  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    tags: [],
    author: '',
    publisher: '',
  });

  useEffect(() => {
    if (!hasFetchedDocs) fetchDocs();
    if (!hasFetchedTags) fetchTags();
  }, [hasFetchedDocs, hasFetchedTags, fetchDocs, fetchTags]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const meta = book.bookMeta;

      const matchesSearch =
        filters.search === '' ||
        book.globalTitle.toLowerCase().includes(filters.search.toLowerCase());

      const matchesAuthor =
        !filters.author || (meta?.author?.toLowerCase().includes(filters.author.toLowerCase()) ?? false);

      const matchesPublisher =
        !filters.publisher || (meta?.publisher?.toLowerCase().includes(filters.publisher.toLowerCase()) ?? false);

      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.every((tag) => book.tags?.map((t) => t.id).includes(tag));

      return matchesSearch && matchesAuthor && matchesPublisher && matchesTags;
    });
  }, [books, filters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleTagFilter = (tagId: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  return (
    <div>
      <h1>Books</h1>

      {/* Filters */}
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          name="search"
          value={filters.search}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Filter by author..."
          name="author"
          value={filters.author}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Filter by publisher..."
          name="publisher"
          value={filters.publisher}
          onChange={handleInputChange}
        />
        {/* Update how the text corresponding to the tag id is displayed --- looks for current locale lang */}
        <div>
          {allTags.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                checked={filters.tags.includes(tag.id)}
                onChange={() => toggleTagFilter(tag.id)}
              />
              {tag.translations[0].title}
            </label>
          ))}
        </div>
      </div>

      {/* Content */}
      {loadingBooks && <p>Loading books...</p>}
      {booksError && <p>Error: {booksError}</p>}
      {!loadingBooks && filteredBooks.length === 0 && <p>No books found.</p>}

      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <div>
              {/* Basic metadata */}
              {/* Another change needed here for how the version is chosen and which mediaItem is also chosen */}
              <img src={book.versions?.[0].mediaItems?.[0].url ?? ''} alt="Cover" width={100} />
              <h3>{book.globalTitle}</h3>
              <p>Author: {book.bookMeta?.author ?? 'N/A'}</p>
              <p>Publisher: {book.bookMeta?.publisher ?? 'N/A'}</p>
              <p>
                Published:{' '}
                {book.bookMeta?.publishedAt
                  ? format(new Date(book.bookMeta.publishedAt), 'P')
                  : 'N/A'}
              </p>
              <p>ISBN: {book.bookMeta?.isbn ?? 'N/A'}</p>
              <p>Pages: {book.bookMeta?.pageCount ?? 'N/A'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;