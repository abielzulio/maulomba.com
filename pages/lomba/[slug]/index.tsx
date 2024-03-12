import {
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import Button from "components/Button"
import CompetitionContent from "components/Competition/CompetitionContent"
import { ContentContainer, Page } from "components/Container"
import Head from "components/Head"
import { product } from "data/product"
import { supabase } from "lib/supabase"
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import NextLink from "next/link"
import { ParsedUrlQuery } from "querystring"
import { Competition } from "types/data"
import { useWindowDimension } from "hooks/useWindowDimension"
import Link from "components/Link"
import { HOME_PATH, UPLOAD_PATH } from "data/paths"

interface CompetitionPageProps {
  competition: Competition
}

interface Params extends ParsedUrlQuery {
  slug: string
}

const CompetitionPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>,
  React.ReactNode
> = ({ competition }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const screenWidth = useWindowDimension()
  const isMobile = screenWidth < 640
  return (
    <>
      <Head
        title={competition?.title + " | " + product.description.short}
        description={competition?.description
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&nbsp;/g, " ")
          .slice(0, 200)}
        author={competition?.event_organizer}
        url={product.url + "/lomba/" + competition?.slug}
      />
      <Page>
        <ContentContainer className="padding-x padding-y flex h-fit items-center justify-between">
          <NextLink href={HOME_PATH}>
            <a className="font-medium tracking-tight text-white opacity-50 transition hover:opacity-100">
              Maulomba
            </a>
          </NextLink>
          <NextLink href={UPLOAD_PATH}>
            <Button
              icon={<ArrowUpTrayIcon className="h-4 w-4" />}
              title={isMobile ? undefined : "Unggah lomba"}
              label={isMobile ? undefined : "Gratis!"}
              kind="secondary"
              size={isMobile ? "small" : "medium"}
              width="fit"
            />
          </NextLink>
        </ContentContainer>
        <CompetitionContent competition={competition} />
        <Link href={HOME_PATH} className="padding-x w-full">
          <Button
            icon={<MagnifyingGlassIcon width={18} height={18} />}
            title="Cari kompetisi lainnya"
            kind="secondary"
            width="full"
            size="medium"
          />
        </Link>
      </Page>
    </>
  )
}

export default CompetitionPage

export const getStaticProps: GetStaticProps<
  CompetitionPageProps,
  Params
> = async ({ params }) => {
  const { data: competition, error } = await supabase
    .from("competitions")
    .select("*")
    .eq("slug", params?.slug)
    .single()

  if (error) {
    console.log(error)
  }

  return {
    props: {
      competition,
    },
  }
}

export const getStaticPaths = async () => {
  const { data: competitions, error } = await supabase
    .from("competitions")
    .select("slug")

  if (error) {
    console.log(error)
  }

  if (!competitions) {
    return {
      notFound: true,
    }
  }

  const paths = competitions
    ?.map((competition) => ({
      params: { slug: competition?.slug },
    }))
    .filter((competition) => competition.params.slug !== "")

  return {
    paths,
    fallback: "blocking",
  }
}
