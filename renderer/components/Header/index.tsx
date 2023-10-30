import React from "react";

import { withRouter } from "next/router";
import Head from "next/head";

import SiteConfig from "./assets/site-config.json";

interface HeaderProps {
  title?: string;
  description?: string;
  image?: string;
  router: any;
}

const Header = ({
  title,
  description,
  image,
  router,
}: HeaderProps): JSX.Element => (
  <Head>
    <title>
      {title
        ? `${title} - ${SiteConfig["site-name"]}`
        : SiteConfig["site-name"]}
    </title>
    <meta
      name="title"
      content={
        title
          ? `${title} - ${SiteConfig["site-name"]}`
          : SiteConfig["site-name"]
      }
    />
    <meta name="description" content={description} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={SiteConfig["site-url"]} />
    <meta
      property="og:title"
      content={
        title
          ? `${title} - ${SiteConfig["site-name"]}`
          : SiteConfig["site-name"]
      }
    />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={SiteConfig["site-url"]} />
    <meta
      property="twitter:title"
      content={
        title
          ? `${title} - ${SiteConfig["site-name"]}`
          : SiteConfig["site-name"]
      }
    />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />

    <link
      rel="canonical"
      href={new URL(
        router.pathname,
        SiteConfig["site-url"].toString()
      ).toString()}
    />
    <link rel="icon" href={SiteConfig.favicon} />
  </Head>
);

export default withRouter(Header);
