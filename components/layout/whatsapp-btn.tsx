import Image from "next/image";

export default function WhatsAppBtn() {
  return (
    <div className="fixed flex justify-start bottom-4 right-4 z-[300]">
      <a
        href="https://wa.me/447935157365"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-300"
      >
        <Image
          src="/WhatsApp.svg"
          alt="WhatsApp"
          width={50}
          height={50}
          className="h-16 w-16"
        />
      </a>
    </div>
  );
}
