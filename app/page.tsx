import { NewChatForm } from "@/components/forms/new-chat-form";

export default function Home() {
  return (
    <div className="w-full h-[calc(100%-32px)] flex flex-col items-center justify-center">
      <div className="w-1/2 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 mb-2">
          <h1 className="text-2xl font-heading">
            Which document do you want to ask about?
          </h1>
          <span className="text-lg">
            Select a file and ask to it question about its content
          </span>
        </div>

        <NewChatForm />
      </div>
    </div>
  );
}
