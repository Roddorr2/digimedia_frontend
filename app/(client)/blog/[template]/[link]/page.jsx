import PlantillaClient1 from "../../plantilla1/PlantillaClient";
import PlantillaClient2 from "../../plantilla2/PlantillaClient";
import PlantillaClient3 from "../../plantilla3/PlantillaClient";
import {
  getAllPublishedBlogs,
  getBlogByLinkServer,
  buildBlogMetadata,
} from "../../services/blogApi.server";

const TEMPLATES = {
  plantilla1: { id: 1, Client: PlantillaClient1 },
  plantilla2: { id: 2, Client: PlantillaClient2 },
  plantilla3: { id: 3, Client: PlantillaClient3 },
};

export async function generateStaticParams() {
  const blogs = await getAllPublishedBlogs();
  return blogs
    .filter((b) => TEMPLATES[b.template])
    .map((b) => ({ template: b.template, link: b.link }));
}

export async function generateMetadata({ params }) {
  const { template, link } = await params;
  const templateInfo = TEMPLATES[template];
  if (!templateInfo) return {};
  const blog = await getBlogByLinkServer(link);
  return buildBlogMetadata({ link, templateId: templateInfo.id, blog });
}

export default async function Page({ params }) {
  const { template, link } = await params;
  const templateInfo = TEMPLATES[template];
  if (!templateInfo) return null;
  const { Client } = templateInfo;
  return <Client link={link} />;
}
