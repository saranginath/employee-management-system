import { useState } from "react";

import {
  useGetPendingLeavesQuery,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
} from "../../features/leave/leaveApi";

import LeaveTable from "../../components/leave/LeaveTable";

import LeaveApprovalModal from "../../components/leave/LeaveApprovalModal";

const ManageLeaves = () => {
  const { data } = useGetPendingLeavesQuery();

  const [approve] = useApproveLeaveMutation();

  const [reject] = useRejectLeaveMutation();

  const [selected, setSelected] = useState<string | null>(null);

  const [reason, setReason] = useState("");

  return (
    <div>
      <h1
        className="
text-3xl
font-bold
mb-6
"
      >
        Manage Leaves
      </h1>

      <LeaveTable leaves={data?.data || []} />

      <LeaveApprovalModal
        open={!!selected}

        reason={reason}

        setReason={setReason}

        onClose={() => setSelected(null)}

        onConfirm={() =>
          reject({
            id: selected,

            reason,
          })
        }
      />
    </div>
  );
};

export default ManageLeaves;
