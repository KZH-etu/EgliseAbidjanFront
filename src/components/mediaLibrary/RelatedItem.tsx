import { MediaLibraryCard } from "../../types/api";

type RelatedItemsProps = {
  item: MediaLibraryCard;
  type?: "audio" | "video" | "text";
};

// This component renders a related item in the media library, displaying its title, speaker, description, location, date, and media controls.

export default function RelatedItem({ item, type }: RelatedItemsProps) {
    return (
        <li key={item.id} style={{ marginBottom: "1em" }}>
            <div>
                <strong>{item.title}</strong>
                {item.speaker && (
                <span> &mdash; <em>{item.speaker}</em></span>
                )}
            </div>
            {item.description && <div>{item.description}</div>}
            {item.location && (
                <div>
                <strong>Location:</strong> {item.location}
                </div>
            )}
            {item.date && (
                <div>
                <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
                </div>
            )}
            {item.mediaUrl && (
                <div>
                {type === "audio" && (
                    <audio controls src={item.mediaUrl} style={{ width: "100%" }} />
                )}
                {type === "video" && (
                    <video controls src={item.mediaUrl} style={{ width: "100%" }} />
                )}
                {(!type || type === "text") && (
                    <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer">
                    View Document
                    </a>
                )}
                </div>
            )}
        </li>
    )};

