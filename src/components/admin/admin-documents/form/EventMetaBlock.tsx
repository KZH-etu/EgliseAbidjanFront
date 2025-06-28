import { EventType, NewDocument } from "../../../../types/api";

const EventMetaBlock: React.FC<{
  form: Partial<NewDocument>;
  setForm: React.Dispatch<React.SetStateAction<Partial<NewDocument>>>;
}> = ({ form, setForm }) => (
    
  <div className="mb-2 p-2 border rounded bg-gray-100">
    <div className="font-semibold mb-1">Event Metadata</div>
    {/* Type */}
    <select
      id="eventType"
      name="eventType"
      className="form-select mb-1"
      value={form.eventMeta?.type || ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          eventMeta: { ...f.eventMeta, type: e.target.value as EventType },
        }))
      }
    >
      <option value="">Select Event Type</option>
      {Object.values(EventType).map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
    {/* Start / End */}
    <input
      id="eventStartTime"
      name="eventStartTime"
      className="form-input mb-1"
      type="date"
      value={form.eventMeta?.startTime
        ? new Date(form.eventMeta.startTime).toISOString().slice(0, 10)
        : ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          eventMeta: {
            ...f.eventMeta,
            startTime: e.target.value ? new Date(e.target.value) : undefined,
          },
        }))
      }
    />
    <input
      id="eventEndTime"
      name="eventEndTime"
      className="form-input mb-1"
      type="date"
      value={form.eventMeta?.endTime
        ? new Date(form.eventMeta.endTime).toISOString().slice(0, 10)
        : ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          eventMeta: {
            ...f.eventMeta,
            endTime: e.target.value ? new Date(e.target.value) : undefined,
          },
        }))
      }
    />
    {/* Location */}
    <input
      id="eventLocation"
      name="eventLocation"
      className="form-input"
      placeholder="Location"
      value={form.eventMeta?.location || ""}
      onChange={(e) =>
        setForm((f) => ({
          ...f,
          eventMeta: { ...f.eventMeta, location: e.target.value },
        }))
      }
    />
  </div>
);

export default EventMetaBlock;