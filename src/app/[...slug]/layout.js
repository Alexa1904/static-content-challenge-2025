export default async function SlugLayout({ params, children }) {
  const slug = await  params.slug.join('/');
  return (
    <div className="w-2/3 bg-white h-[600px] rounded-xl">
      <div className="w-full h-16 rounded-t-xl shadow-md bg-white flex justify-center items-center text-xl">
        Content file rendered:{' '}
        <span className="ml-2 text-[#F9C001] font-semibold">{`/${slug}`}</span>
      </div>
      <div className="px-6 py-8">{children}</div>
    </div>
  );
}
