import { Uploader } from "@/components/file-upload/uploader";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function PhotoStep({ onNext, onLogout, onChange, value }: any) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl text-center animate-in fade-in zoom-in-95">
      <h2 className="text-2xl font-bold mb-4">Set Your Profile Identity</h2>
      <p className="text-slate-500 mb-8">
        This photo is for your official student ID.
      </p>

      <div className="max-w-sm mx-auto mb-8">
        <Uploader fileTypeAccepted="image" value={value} onChange={onChange} />
      </div>

      <div className="flex gap-4">
        <Button variant="ghost" onClick={onLogout} className="flex-1">
          Exit
        </Button>
        <Button
          disabled={!value}
          onClick={onNext}
          className="flex-1 bg-indigo-600"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
