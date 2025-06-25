import { NewDocument } from "../../../../types/api";

const SermonMetaBlock: React.FC<{
  form: Partial<NewDocument>;
  setForm: React.Dispatch<React.SetStateAction<Partial<NewDocument>>>;
}> = ({ form, setForm }) => (
    
  <div className="mb-2 p-2 border rounded bg-gray-100">
    <div className="font-semibold mb-1">Sermon Metadata</div>
    <input
      className="form-input mb-1"
      placeholder="Preacher"
      value={form.sermonMeta?.preacher || ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          sermonMeta: { ...f.sermonMeta, preacher: e.target.value },
        }))
      }
    />
    <input
      className="form-input mb-1"
      type="date"
      value={form.sermonMeta?.preachedAt
        ? new Date(form.sermonMeta.preachedAt).toISOString().slice(0, 10)
        : ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          sermonMeta: {
            ...f.sermonMeta,
            preachedAt: e.target.value ? new Date(e.target.value) : undefined,
          },
        }))
      }
    />
    <input
      className="form-input"
      placeholder="Location"
      value={form.sermonMeta?.location || ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          sermonMeta: { ...f.sermonMeta, location: e.target.value },
        }))
      }
    />
  </div>
);

export default SermonMetaBlock;