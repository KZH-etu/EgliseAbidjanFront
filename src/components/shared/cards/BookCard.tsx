import { BookCardData } from "../../../types/api";
import CardContainer from "./CardContainer";

/**
 * Book card
 */
const BookCard: React.FC<{ data: BookCardData }> = ({ data }) => (
  <CardContainer>
    <h3 className="text-lg font-semibold">{data.title}</h3>
    <p className="text-sm">Author: {data.bookMeta.author}</p>
    <p className="text-sm">Publisher: {data.bookMeta.publisher ?? 'N/A'}</p>
    <p className="text-sm">Pages: {data.bookMeta.pageCount ?? 'N/A'}</p>
  </CardContainer>
);

export default BookCard;