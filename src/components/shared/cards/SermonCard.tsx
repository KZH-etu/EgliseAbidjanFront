import { SermonCardData } from "../../../types/api";
import CardContainer from "./CardContainer";

/**
 * Sermon card
 */
const SermonCard: React.FC<{ data: SermonCardData }> = ({ data }) => (
  <CardContainer>
    <h3 className="text-lg font-semibold">{data.title}</h3>
    <p className="text-sm">Preacher: {data.sermonMeta.preacher}</p>
    <p className="text-sm">
      Date: {new Date(data.sermonMeta.preachedAt).toLocaleDateString()}
    </p>
  </CardContainer>
);

export default SermonCard;