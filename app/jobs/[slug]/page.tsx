import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobPosting from "@/components/JobPosting";
import { jobs, getJobBySlug } from "@/lib/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Role Not Found | Bulwark Dynamics" };

  return {
    title: `${job.title} | Bulwark Dynamics Careers`,
    description: job.overview,
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <Header />
      <main>
        <JobPosting job={job} />
      </main>
      <Footer />
    </>
  );
}
