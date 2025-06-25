import { NewDocument } from "../../../../types/api";

const BookMetaBlock: React.FC<{
  form: Partial<NewDocument>;
  setForm: React.Dispatch<React.SetStateAction<Partial<NewDocument>>>;
}> = ({ form, setForm }) => (
    
  <div className="mb-2 p-2 border rounded bg-gray-100">
    <div className="font-semibold mb-1">Book Metadata</div>
    {/* Author */}
    <input
      className="form-input mb-1"
      placeholder="Author"
      value={form.bookMeta?.author || ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          bookMeta: { ...f.bookMeta, author: e.target.value },
        }))
      }
    />
    {/* Published At */}
    <input
      className="form-input mb-1"
      type="date"
      value={form.bookMeta?.publishedAt
        ? new Date(form.bookMeta.publishedAt).toISOString().slice(0, 10)
        : ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          bookMeta: {
            ...f.bookMeta,
            publishedAt: e.target.value ? new Date(e.target.value) : undefined,
          },
        }))
      }
    />
    {/* Publisher */}
    <input
      className="form-input mb-1"
      placeholder="Publisher"
      value={form.bookMeta?.publisher || ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          bookMeta: { ...f.bookMeta, publisher: e.target.value },
        }))
      }
    />
    {/* ISBN */}
    <input
      className="form-input mb-1"
      placeholder="ISBN"
      value={form.bookMeta?.isbn || ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          bookMeta: { ...f.bookMeta, isbn: e.target.value },
        }))
      }
    />
    {/* Page Count */}
    <input
      className="form-input"
      type="number"
      placeholder="Page Count"
      value={form.bookMeta?.pageCount || ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          bookMeta: {
            ...f.bookMeta,
            pageCount: e.target.value ? Number(e.target.value) : undefined,
          },
        }))
      }
    />
  </div>
);

export default BookMetaBlock;