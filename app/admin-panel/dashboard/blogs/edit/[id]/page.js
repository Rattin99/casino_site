import EditBlogClient from "@/components/admin/EditBlogClient";

export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default function EditBlogPage() {
  return <EditBlogClient />;
}