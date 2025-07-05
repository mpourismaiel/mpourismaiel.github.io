import { BlogPostLayout, BlogSEOType } from "@/components/blog/BlogPostLayout";
import { H3 } from "@/components/blog/H3";
import { postStaticProps } from "@/lib/serverUtils";
import { BlogLinkType } from "@/lib/types";

export const seo: BlogSEOType = {
  draft: false,
  title: "Unideck; How we did it",
  description:
    "How we made our custom solution to connect to all our services and make a custom dashboard for our team.",
  date: new Date("2025-07-05"),
  lastmod: new Date("2025-07-05"),
  image: "/unideck.svg",
  imageExtraClasses: "object-center object-cover bg-white w-full h-[250px]",
  tags: ["development", "technical"],
};

export const getStaticProps = postStaticProps;

export default function BlogPostPage({ posts }: { posts: BlogLinkType[] }) {
  return (
    <BlogPostLayout seo={seo} relatedPostsPool={posts}>
      <p>
        We started working on{" "}
        <a href="https://unideck.app" target="_blank">
          UniDeck
        </a>{" "}
        in November 2024 as a way to ease how our team managed clients and
        projects. We were using various tools such as Trello for task
        management, Google Calendar and Meet for meetings, Gmail for
        communication, GitHub for code, and Grafana for monitoring. Navigating
        all of these apps was not that complicated, but still, one common thing
        was that going into a meeting, someone would have missed some critical
        detail.
      </p>
      <p>
        So we decided to look for tools that would let us navigate different
        services in a single page, preferably a new tab page or at least a
        fast-to-load app that we could integrate into our daily flow and have a
        glimpse of what's going on as we go through our day.
      </p>
      <p>
        Looking through different tools, it quickly became apparent that the
        only complete approach would be to connect a bunch of bots to our
        Discord or Slack server. This approach would work for a while, but as
        time went on, it became apparent that the number of notifications made
        almost everyone mute the bots' channel and miss even more important
        updates.
      </p>
      <p>
        Our solution to this problem:{" "}
        <a href="https://unideck.app" target="_blank">
          UniDeck
        </a>
        . A drag-and-drop tool that would connect to any tool we'd like and
        display a widget with important information from that service. We
        started implementing widgets for the services we used most frequently,
        and by the end of 2024, we had a solid app that helped our productivity,
        organization, and kept everyone in the loop.
      </p>
      <figure className="rounded-lg shadow-xl bg-[hsl(266,24%,15%)] overflow-hidden">
        <img
          src="/unideck-simple-dashboard.png"
          alt="Unideck simple dashboard"
          className="object-center object-cover bg-white w-full rounded-xl"
        />
        <figcaption className="text-center text-sm text-[hsl(266,5%,50%)] pb-3">
          Example of a custom dashboard with some of our widgets.
        </figcaption>
      </figure>
      <H3 title="How does UniDeck work?" />
      <p>
        <a href="https://unideck.app" target="_blank">
          UniDeck
        </a>{" "}
        works by allowing users to drag and drop widgets for different services
        and several local widgets, such as a to-do list and notes. Each service
        requires the user to connect their account from that service and specify
        which workspace from that service should be used. From then on, whenever
        they open{" "}
        <a href="https://unideck.app" target="_blank">
          UniDeck
        </a>
        , they can see all the important information from that service, such as
        any updates to a certain project's pull requests or issues on GitHub, or
        what issues have been created on their Jira workspace.
      </p>
      <p>
        <a href="https://unideck.app" target="_blank">
          UniDeck
        </a>{" "}
        uses a combination of modern tools and techniques to solve several
        important problems that prevented such a tool from existing before this.
      </p>
      <H3 title="Tech Stack" />
      <p>
        Handling all the widgets means juggling several logic-heavy components
        in custom arrangements and load orders. At first, we tried to implement
        our custom request management solution, but it quickly became apparent
        that managing the order of the requests and caching would be too complex
        and too time-consuming. Switching to{" "}
        <a href="https://tanstack.com/query/latest/docs/framework/react/overview">
          <b>Tanstack's amazing query</b>
        </a>{" "}
        library removed a lot of the hassle in this area. Using tanstack query
        allowed us to only focus on each widget's logic, and the library would
        manage how the requests are executed, cached, stored, and what data
        needs to be refreshed when the user visits our website again.
      </p>
      <p>
        Another example is connecting all the different services and managing
        their state, which requires a combination of various tools and
        libraries. Connecting everything and having them work in different
        combinations would be difficult to manage, except that{" "}
        <a href="https://nestjs.com/">
          <b>Nest.js</b>
        </a>{" "}
        allowed us to have a bunch of modules available to be injected for use
        in these services.
      </p>
      <H3 title="Product Hunt Launch" />
      <p>
        We launched an alpha version of{" "}
        <a href="https://unideck.app" target="_blank">
          UniDeck
        </a>{" "}
        at the start of 2025 to gauge interest and as it turns out, we were not
        the only team facing this problem. as we became the second product of
        the day, we decided to move our focus to{" "}
        <a href="https://unideck.app" target="_blank">
          UniDeck
        </a>{" "}
        and work on it a lot more, polishing everything, adding more features
        and fixing a lot of bugs. We added advanced widgets to allow power users
        to connect any api we haven't gotten to, especially connecting to their
        own services, and have tables and charts for easy use without the need
        for configuring a bunch of complex services. We also laid the groundwork
        for creating a widget marketplace so that in the future, anyone can
        create a widget and allow other users to use it.
      </p>
      <p>
        With all of these fixes, we launched our beta version on July 2nd, 2025,
        and received a lot of nice reviews and new users.
      </p>
      <div className="flex items-center justify-center">
        <a
          href="https://www.producthunt.com/products/unideck?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_source=badge-unideck"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=748563&theme=light&period=daily&t=1751718613826"
            alt="UniDeck - No&#0045;Code&#0032;dashboards&#0032;for&#0032;everyone | Product Hunt"
            style={{ width: "250px", height: "54px" }}
            width="250"
            height="54"
          />
        </a>
      </div>
      <p>
        We are proud to have created a unique product that piqued the interest
        of so many people and companies around the world, and we are excited to
        work even more on{" "}
        <a href="https://unideck.app" target="_blank">
          UniDeck
        </a>
        !
      </p>
      <p>
        You can check out the{" "}
        <a href="https://unideck.app" target="_blank">
          UniDeck
        </a>{" "}
        website and try it out for yourself.
      </p>
    </BlogPostLayout>
  );
}
