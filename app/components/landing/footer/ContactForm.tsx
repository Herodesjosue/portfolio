import { FormStatus } from "./types";

interface ContactFormProps {
  status: FormStatus;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ContactForm({ status, onSubmit }: ContactFormProps) {
  const isDisabled = status === "LOADING" || status === "SUCCESS";

  return (
    <div
      className="flex flex-col lg:w-1/2 justify-center lg:pl-12"
      data-reveal="fade-up"
      data-reveal-delay="200"
    >
      <form className="flex flex-col gap-12 w-full max-w-lg" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 group">
          <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted group-focus-within:text-fg transition-colors">
            01 // Name
          </label>
          <input
            name="name"
            type="text"
            required
            disabled={isDisabled}
            className="w-full bg-transparent border-b border-fg/20 py-4 font-black uppercase text-2xl lg:text-3xl text-fg focus:outline-none focus:border-fg transition-colors placeholder:text-fg/10 disabled:opacity-50"
            placeholder="JOHN DOE"
          />
        </div>

        <div className="flex flex-col gap-2 group">
          <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted group-focus-within:text-fg transition-colors">
            02 // Email
          </label>
          <input
            name="email"
            type="email"
            required
            disabled={isDisabled}
            className="w-full bg-transparent border-b border-fg/20 py-4 font-black uppercase text-2xl lg:text-3xl text-fg focus:outline-none focus:border-fg transition-colors placeholder:text-fg/10 disabled:opacity-50"
            placeholder="HELLO@DOMAIN.COM"
          />
        </div>

        <div className="flex flex-col gap-2 group">
          <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted group-focus-within:text-fg transition-colors">
            03 // Message
          </label>
          <textarea
            name="message"
            required
            rows={1}
            disabled={isDisabled}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            className="w-full bg-transparent border-b border-fg/20 py-4 font-black uppercase text-xl lg:text-2xl text-fg focus:outline-none focus:border-fg transition-colors resize-none overflow-hidden placeholder:text-fg/10 disabled:opacity-50"
            placeholder="TELL ME ABOUT YOUR PROJECT..."
          />
        </div>

        <div className="mt-12 w-full flex flex-col gap-6 items-start lg:items-end">
          {status === "SUCCESS" && (
            <p className="font-mono text-[10px] tracking-widest text-green-500 uppercase animate-fade-in">
              {"✓ Message sent successfully. I'll get back to you soon."}
            </p>
          )}
          {status === "ERROR" && (
            <p className="font-mono text-[10px] tracking-widest text-red-500 uppercase animate-fade-in">
              × Something went wrong. Please try again or email me directly.
            </p>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className="group relative inline-flex w-full sm:w-auto items-center justify-center px-12 py-6 lg:px-20 lg:py-8 bg-cta text-white transition-all duration-500 hover:scale-105 overflow-visible disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {status === "LOADING" ? (
              <span className="relative z-10 font-mono text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-3">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                PROCESSING...
              </span>
            ) : (
              <>
                {status === "IDLE" && (
                  <>
                    <div
                      className="absolute inset-0 border border-cta animate-ping opacity-20"
                      style={{ animationDuration: "3s" }}
                    />
                    <div className="absolute inset-0 border border-cta opacity-20 group-hover:scale-y-125 group-hover:scale-x-105 group-hover:opacity-0 transition-all duration-700" />
                  </>
                )}
                <span className="relative z-10 font-mono text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-4">
                  {status === "SUCCESS" ? "✓ MESSAGE SENT" : "START PROJECT"}
                  {status === "IDLE" && (
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  )}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
