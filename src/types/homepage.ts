import { EventSummaryDto, SermonSummaryDto } from "./documents/documents";

export interface HomePageDto {
    sermons: SermonSummaryDto[];
    events: EventSummaryDto[];
}