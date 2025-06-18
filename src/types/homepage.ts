import { EventSummaryDto, SermonSummaryDto } from "./documents";

export interface HomePageDto {
    sermons: SermonSummaryDto[];
    events: EventSummaryDto[];
}