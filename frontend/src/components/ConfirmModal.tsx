import type { Report } from "../schemas";

interface ConfirmModalProps {
  confirmModalRef: React.RefObject<HTMLDialogElement | null>;
  payload: Report | null;
  setShowConfirm: (flag: boolean) => void;
  sendPayload: (payload: Report) => Promise<void>;
}

export default function ConfirmModal({
  confirmModalRef,
  payload,
  setShowConfirm,
  sendPayload
}: ConfirmModalProps) {
  return (
    <dialog 
      ref={confirmModalRef} 
      className="m-auto rounded-md bg-white backdrop:bg-black/50"
    >
      <div className="flex flex-col">
        <span 
          className="text-lg font-bold text-white bg-black text-center py-1"
        >Confirm submission
        </span>
        <div className="flex flex-col p-5 gap-12">
          <span className="font-bold">Ready to submit?</span>
          <div className="flex justify-between gap-28">
            <button 
              onClick={() => {
                if (payload) {
                  sendPayload(payload);
                  setShowConfirm(false);
                }
              }}
              className="bg-green-600 font-bold text-white px-8 py-2 rounded 
                cursor-pointer hover:bg-green-500"
            >
              Yes
            </button>
            <button 
              onClick={() => setShowConfirm(false)}
              className="bg-red-600 font-bold text-white px-8 py-2 rounded 
                cursor-pointer hover:bg-red-500"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}