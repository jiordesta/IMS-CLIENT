type GlobalLoaderProps = {
  showBg?: boolean;
};

export default function GlobalLoader({ showBg = true }: GlobalLoaderProps) {
  return (
    <div
      className={`w-full h-full ${showBg && "bg-black/50"} rounded-xl inset-0 absolute flex justify-center items-center`}
    >
      <img src="/icons/loading2.svg" alt="" width={75} />
    </div>
  );
}
