import Link from "next/link";

import { CodeTag } from "@/components/CodeTag";
import { BlogPostLayout, BlogSEOType } from "@/components/blog/BlogPostLayout";
import { H3 } from "@/components/blog/H3";
import { H4 } from "@/components/blog/H4";

export const seo: BlogSEOType = {
  title: "What's up with Deno?",
  description:
    "Why Deno is the new hotness and what it means for Node.js developers.",
  date: new Date("2024-11-08"),
  lastmod: new Date("2024-11-08"),
  image: "/whats-up-with-deno.png",
  tags: ["development", "opinion"],
};

export default function BlogPostPage() {
  return (
    <BlogPostLayout seo={seo}>
      <p>
        Deno 2 was released a couple of weeks ago and most of us have seen the
        fun teasers and have heard of the new features. But why should it
        matter? Is it any better than Node.js? What does it mean for the
        JavaScript ecosystem?
      </p>
      <H3 title="Node issues" />
      <p>
        Node.js has been around for a while now and it has been the go-to
        backend JavaScript runtime for many developers. But it has its issues.
        The most important issue is, believe it or not, the popularity which
        attracts bad actors like hungry bears to the river. The npm ecosystem is
        huge with millions of packages that are downloaded billions of times
        each week and let's be honest, we have no idea what's in them.
      </p>
      <p>
        The npm ecosystem provides various packages and most of them are
        developed by a single person or a small team with no outside support,
        usually not receiving any technical help let alone any monetary support
        which understandably causes burnout especially when the package becomes
        popular. This leads to the package being abandoned or worse, being
        passed on to a malicious actor.
      </p>
      <p>
        The ideal scenario would be that we as the community would take over and
        our companies would support the development of these packages that we so
        easily install and speed up our development. But that's not happening.
        What's happening is a package that was responsible for checking if a
        number was even is suddenly sending requests to a remote server. With
        Node.js there's no way you can catch this unless you do a bunch of stuff
        in a wrapper. With Deno, this is not the case.
      </p>
      <H3 title="Deno philosophy" />
      <p>
        What I described in the previous section is the most important issue
        with Node.js runtime but there are a lot more issues that came up over
        the years. Such as setting up typescript, the lack of a standard module
        system, the lack of a standard testing framework, the lack of standard
        formatting, linter, becnhmarking and more. Deno solves a lot of these
        issues. One might think these issues can be solved with installing a
        bunch of packages and that just emboldens the security issue I just
        mentioned and Deno solves that to a great degree as well.
      </p>
      <CodeTag
        languages={{
          bash: `mkdir my-project
cd my-project
npm init -y
npm i typescript tsx eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier
# set up the files .eslintrc.json, .prettierrc.json, tsconfig.json
# hopefully everything works the way you want it to, if not, good luck!`,
        }}
      />
      <p>
        Deno provides a permission system that allows you to control what your
        code can do. Upon starting a Deno script, you can pass in permissions to
        access filesystem, network, environment variables and subprocesses. This
        ensures that you can safely run code that you don't trust and that
        includes packages you installed from npm (which Deno 2 now supports out
        of the box). You can check out{" "}
        <Link href="https://docs.deno.com/runtime/fundamentals/security/">
          Deno's security documentation
        </Link>{" "}
        for more information on the related options. With this system in place,
        you can be sure that the code you're running is not doing anything you
        are not expecting it to do. That still doesn't prevent packages from
        acting malicious but with proper structuring of your code (separating
        remote contacting code from the rest of your code for example) you can
        have nicer weekends!
      </p>
      <CodeTag
        languages={{
          bash: `deno run --allow-net --allow-read --allow-env server.ts`,
        }}
      />
      <H3 title="Typescript, testing, linter and formatter support" />
      <p>
        With Node.js you had to run <code>npm init</code> to have a{" "}
        <code>package.json</code> which would host your dependencies and
        scripts. Then you had to add a <code>tsconfig.json</code>,{" "}
        <code>prettier.config.json</code>, <code>eslint.config.json</code> just
        to start coding. With Deno, you just run <code>deno init</code> and
        that's it. Deno would run your code whether it's TypeScript or
        JavaScript and with <code>deno lint</code> and <code>deno fmt</code> you
        can lint and format your code. No need to install or configure any
        packages. Also with <code>deno test</code> any file with suffix{" "}
        <code>_test.js or _test.ts</code> are treated as tests which have pretty
        good support for assertions, mocking, parallel testing and same
        permission system as the runtime (read more{" "}
        <Link href="https://docs.deno.com/runtime/fundamentals/testing/">
          here
        </Link>
        ).
      </p>
      <CodeTag
        languages={{
          bash: `deno init my-project
cd my-project
deno lint # or deno lint src/ for a specific directory
deno fmt # deno fmt src/ for a specific directory
# Happy life!`,
        }}
      />
      <p>
        It's important that Deno provides these features out of the box since
        your project would be much easier to manage and all of it is standard as
        in supported by the runtime itself, not community accepted standards
        which would mean it changes with a new trend. When you hire a developer
        familiar with Deno you can safely assume they are comfortable with the
        coding style which is one less thing to worry about and something that
        Go developers have been enjoying for a long while.
      </p>
      <H3 title="Deno server" />
      <p>
        It might seem a small thing, it did to me, but a good built-in server is
        really nice. Don't get me wrong, I love express and fastify but I'm
        tired of installing them with each test project I want to do and I'm
        hardly the only one, since Deno and Bun both went ahead and implemented
        one. I mean, these are server side runtimes, why the hell doesn't
        Node.js provide it. That's not to say I don't appreciate Node.js but
        come on! Deno's server is pretty simple to use and it's pretty powerful,
        it supports websockets, http2, https, and it's pretty fast. The
        parameters and return types are standard web APIs which is so nice to
        see. It has good{" "}
        <Link href="https://docs.deno.com/runtime/fundamentals/http_server">
          documentation
        </Link>{" "}
        that I highly recommend you check out.
      </p>
      <H4 title="HTTP Server" />
      <CodeTag
        languages={{
          typescript: `Deno.serve({ port: 4242, hostname: "0.0.0.0" }, async (req: Request) => {
  console.log("Method:", req.method);

  const url = new URL(req.url);
  console.log("Path:", url.pathname);
  console.log("Query parameters:", url.searchParams);

  console.log("Headers:", req.headers);

  if (req.body) {
    const body = await req.text();
    console.log("Body:", body);
  }

  return new Response("Hello, World!");
});`,
        }}
      />
      <H4 title="Websockets" />
      <CodeTag
        languages={{
          typescript: `Deno.serve((req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener("open", () => {
    console.log("a client connected!");
  });

  socket.addEventListener("message", (event) => {
    if (event.data === "ping") {
      socket.send("pong");
    }
  });

  return response;
});`,
        }}
      />
      <H3 title="Other goodies" />
      <p>
        With Deno you get a lot more goodies than what I mentioned in brief
        detail above. You get a semantically versioned standard library (that
        you can note in your <code>deno.json</code> file), you have a great
        experience with monorepos and you get support for running Next, Astro,
        Vite and{" "}
        <Link href="https://docs.deno.com/runtime/fundamentals/web_dev">
          more
        </Link>{" "}
        and you get an all-in-one configuration file that you can use to
        configure your runtime.
      </p>
      <p>
        <strong>Is it Node.js compatible?</strong> Kind of. You still have to
        migrate a bunch of stuff such as standard library and npm package names
        are prefixed, packages that don't have types included need an extra
        comment directive, <code>node_modules</code> is not really a thing in
        Deno and a bunch of other stuff. You should check out{" "}
        <Link href="https://docs.deno.com/runtime/fundamentals/node">
          the migration guide
        </Link>{" "}
        before making any decisions.
      </p>
      <p>
        <strong>Is it time to switch from Node.js?</strong> I'm still not sure.
        I waited a couple of weeks before even testing Deno 2 since I wanted to
        read other people's experiences and have a better overview of the
        issues. While I still haven't found anything that would convince me not
        to switch I'm still hesitant. I would say for a new side project, it's
        better to use Deno but for a production project of any size, you might
        want to branch out and test it a bunch first.
      </p>
      <p>
        <strong>Is it better than Bun?</strong> Hell yeah it is! Bun is a great
        alternative if I want to run something faster than it does on Node.js
        but Deno is a much better alternative due to it's simple project
        structure and typescript support out of the box (I'm seriously sick of
        setting that up myself). And since speed isn't really a concern in most
        projects, I'd rather write the entire project with Deno in mind and
        write a package for Bun to run containing the speed critical part.
      </p>
      <p>
        And with all that, I encourage you to give Deno a go and let me know
        what you think. I'm still trying to decide what to do with a bunch of
        different projects and I'd love to hear your thoughts on the matter.
      </p>
    </BlogPostLayout>
  );
}
