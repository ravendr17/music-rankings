interface ErrorsModalProps {
  errors: string;
  setShowErrors: (flag: boolean) => void;
  errorsRef: React.RefObject<HTMLDialogElement | null>;
}

export default function ErrorsModal({errors, setShowErrors, errorsRef}: ErrorsModalProps) {
  return (
    <dialog 
      ref={errorsRef} 
      className="m-auto rounded-md bg-white backdrop:bg-black/50"
    >
      <div className="flex flex-col">
        <div className="text-lg font-bold text-white bg-red-600 text-center py-1">Errors</div>
        <div className="flex flex-col p-5 gap-6">
          <pre className="text-sm">{errors}</pre>
          <div className="flex justify-end">
            <button 
              className="bg-red-600 font-bold text-white px-8 py-2 rounded 
                cursor-pointer hover:bg-red-500"
              onClick={() => setShowErrors(false)}
            >
              Close
            </button>
        </div>
        
        </div>
      </div>
    </dialog>
  );
}