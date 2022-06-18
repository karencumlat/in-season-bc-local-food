import Image from 'next/image';
export default function Header() {
  return (
    <div className="flex">
      <Image
        src="/images/in-season-logo.png"
        alt="In Season Logo"
        width={333}
        height={188}
      />
    </div>
  );
}
