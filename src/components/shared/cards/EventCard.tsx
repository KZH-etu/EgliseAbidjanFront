import { EventCardData } from "../../../types/api";
import CardContainer from "./CardContainer";

/**
 * Event card
 */
const EventCard: React.FC<{ data: EventCardData }> = ({ data }) => (
  <CardContainer>
    <h3 className="text-lg font-semibold">{data.title}</h3>
    <p className="text-sm">
      Start: {new Date(data.eventMeta.startTime).toLocaleDateString()}
    </p>
    {data.eventMeta.location && (
      <p className="text-sm">Location: {data.eventMeta.location}</p>
    )}
  </CardContainer>
);

export default EventCard;