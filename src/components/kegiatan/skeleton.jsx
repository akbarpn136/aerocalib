export default function DefaultSkeletonComponent() {
  return (
    <div class="flex flex-col gap-4 p-2">
      <div class="skeleton h-32 w-full"></div>
      <div class="skeleton h-4 w-5/12"></div>
      <div class="skeleton h-4 w-5/6"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>
  );
}
