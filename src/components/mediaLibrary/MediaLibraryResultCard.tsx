import React from "react";
import { MediaLibraryItem } from "../../types/api";

export type MediaLibraryResultProps = {
    item: MediaLibraryItem,
    onClick: ()=> void
}

const MediaLibraryResultCard: React.FC<MediaLibraryResultProps> = ({
  item,
  onClick,
}) => {

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        width: 320,
        background: "#fafbfc",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        cursor: "pointer"
      }}
      onClick={onClick}
      title="View details"
    >
      <h3 style={{ margin: "0 0 8px 0" }}>{item.title}</h3>
      {item.description && (
        <p style={{ margin: "0 0 8px 0", color: "#555" }}>{item.description}</p>
      )}
      <div style={{ fontSize: 14, marginBottom: 8 }}>
        <strong>Categories:</strong>{" "}
        {item.categories.map((cat: string) => (
          <span key={cat} style={{ marginRight: 6 }}>{cat}</span>
        ))}
      </div>
      <div style={{ fontSize: 14, marginBottom: 8 }}>
        <strong>Language:</strong> {item.language.name}
      </div>
      {item.keyPersons.length > 0 && (
        <div style={{ fontSize: 14, marginBottom: 8 }}>
          <strong>Key Persons:</strong> {item.keyPersons.join(", ")}
        </div>
      )}
      <div style={{ fontSize: 14, marginBottom: 8 }}>
        <strong>Tags:</strong>{" "}
        {item.tags.length > 0
          ? item.tags.map((t: any) => (
              <span key={t.id} style={{ marginRight: 4 }}>{t.title}</span>
            ))
          : <span style={{ color: "#aaa" }}>None</span>}
      </div>
      <div style={{ fontSize: 14, marginBottom: 8 }}>
        <strong>Media Type:</strong> {item.mediaType}
      </div>
      <div style={{ fontSize: 12, color: "#888" }}>
        <strong>Media ID:</strong> {item.mediaId}
      </div>
    </div>
  );
}

export default MediaLibraryResultCard;