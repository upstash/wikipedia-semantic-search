export const SearchSkeleton = () => {
  return (
    <div className="flex flex-col divide-y divide-zinc-700/10">
      <div className="mb-8 h-10 rounded-md animate-pulse bg-zinc-700/10" />
      {new Array(3).fill(null).map((_, i) => (
        <div className="flex flex-col gap-2 py-4" key={i}>
          <div className="max-w-[600px] mt-2 sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
          <div className="max-w-[450px] mt-2 sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
          <div className="max-w-[450px] sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
          <div className="max-w-[120px] sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
        </div>
      ))}
    </div>
  );
};
