interface Props {
  open: boolean;

  reason: string;

  setReason: (v: string) => void;

  onClose: () => void;

  onConfirm: () => void;
}

const LeaveApprovalModal = ({
  open,

  reason,

  setReason,

  onClose,

  onConfirm,
}: Props) => {
  if (!open) return null;

  return (
    <div
      className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
"
    >
      <div
        className="
bg-white
p-6
rounded-xl
w-full
max-w-md
"
      >
        <h2
          className="
text-xl
font-bold
"
        >
          Reject Leave
        </h2>

        <textarea
          className="
w-full
border
rounded-xl
mt-4
p-3
"

          value={reason}

          onChange={(e) => setReason(e.target.value)}
        />

        <div
          className="
flex
justify-end
gap-3
mt-5
"
        >
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={onConfirm}

            className="
bg-red-600
text-white
px-4
py-2
rounded-lg
"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveApprovalModal;
