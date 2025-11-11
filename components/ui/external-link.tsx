import { ExternalLinkIcon } from "lucide-react";

export default function ExternalLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1"
    >
      View Project <ExternalLinkIcon className="w-4 h-4" />
    </a>
  );
}
