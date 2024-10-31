import { NextSeo } from "next-seo";
import Link from "next/link";

import { CodeTag } from "@/components/CodeTag";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { H3 } from "@/components/blog/H3";
import { H4 } from "@/components/blog/H4";
import { Image } from "@/components/blog/Image";
import { BlogSEOType } from "@/lib/types";

export const seo = {
  draft: false,
  title: "Why you should benchmark your code",
  description:
    "Benchmarking and writing fast code is a crucial part of software development. Learn how to write faster code and why you should benchmark your code.",
  date: new Date("2024-10-30"),
  lastmod: new Date("2024-10-30"),
  image: "/why-you-should-benchmark-your-code-01.jpg",
  tags: ["development", "testing", "benchmarking"],
} satisfies BlogSEOType;

export default function BlogPostPage({ slug }: { slug: string }) {
  return (
    <BlogPostLayout seo={seo}>
      <div className="flex flex-col pb-8 min-h-[calc(100dvh-300px)]">
        <h1 className="text-xl font-bold xl:text-3xl pb-2 pt-8">
          {`${seo.draft ? "[WIP] - " : ""}${seo.title}`}
        </h1>
        <div className="flex items-center mb-6">
          <time
            className="text-sm text-muted-foreground"
            dateTime={seo.date.toISOString()}
          >
            {`Published on ${new Date(seo.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}
          </time>
        </div>
        <div className="prose prose-invert prose-zinc max-w-none">
          <Image src={seo.image} alt={seo.title} />
          <p>
            I started programming at a young age without any guidance, which
            meant for the longest time I had no idea what everyone meant by big
            O notation, or why it was important to write efficient code. I just
            wrote code that worked, and that was good enough for me. But as I
            started working on larger projects, I realized that writing
            efficient code was crucial to the success or even usability of my
            projects.
          </p>
          <p>
            And that's where benchmarking comes in. Benchmarking is the process
            of measuring the performance of your code, and it's an essential
            part of software development. By benchmarking your code, you can
            identify bottlenecks and optimize your code. You can write complex
            algorithms and make sure they run efficiently. You can test
            different implementations and compare their performance.
          </p>
          <H3 title="Simple Implementation" />
          <p>
            Benchmarking goes hand in hand with unit testing. When you write
            unit tests, you're testing the correctness of your code. But when
            you benchmark your code, you're testing the performance of your
            code. I like to write unit tests and whenever it's important, at
            least write a time function and log the time it takes to run the
            function.
          </p>
          <p>
            The simplest form of benchmarking that I employ is to write a
            function that takes another function as an argument, runs that
            function, and logs the time it took to run the function. Here's a
            simple implementation of such a function:
          </p>
          <CodeTag
            languages={{
              typescript: `function time(func: Function): void {
  const start = Date.now();
  func();
  const end = Date.now();
  console.log(\`Function took \${end - start}ms to run.\`);
}

const add = (a: number, b: number) => a + b;
time(() => add(1, 2));`,
              go: `func time(f func()) {
  start := time.Now()
  f()
  end := time.Now()
  fmt.Printf("Function took %dms to run.\\n", end.Sub(start).Milliseconds())
}

func add(a, b int) int {
  return a + b
}

func main() {
  time(func() {
    add(1, 2)
  })
}`,
            }}
          />
          <p>
            You can pass your code to this <code>time</code> function and it
            will log the time it took to run your code. This is a simple and
            effective way to benchmark your code. You can use this function to
            test different implementations of the same code and compare their
            performance.
          </p>
          <H3 title="More Advanced Options" />
          <p>
            While the simple implementation is good enough for most cases, there
            are times when you need to make sure your code is running fast
            consistently and properly using different inputs. In such cases, the
            most basic way is to use a function such as the one below:
          </p>
          <CodeTag
            languages={{
              typescript: `function benchmark(func: Function, args: () => unknown[], iterations: number): void {
  const times: number[] = [];
  const runs: [unknown[], unknown[]] = []
  const benchmarkStart = Date.now()
  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    const input = args()
    const result = func(...input);
    const end = Date.now();
    times.push(end - start);
    runs.push([input, result])
  }

  const benchmarkEnd = Date.now()
  const average = times.reduce((a, b) => a + b, 0) / times.length;
  console.log('Runs:');
  runs.forEach(([args, result]) => console.log(\`\${args} -> \${result}\`));
  console.log(\`Function took an average of \${average}ms to run and total of \${benchmarkEnd - benchmarkStart}ms to complete.\`);
}

benchmark((a: number, b: number) => a + b, () => [Math.random(), Math.random()], 1000)`,
            }}
          />
          <p>
            This is a more advanced version of the <code>time</code> function,
            allowing you to monitor different inputs and outputs of your code.
            Still, it's a simple implementation and not a true benchmarking
            library. But for most cases this is more than good enough.
          </p>
          <p>
            For my daily work, I usually don't need anything more than this.
            Usually you are using libraries that are already optimized and you
            only need to keep an eye on your own code. But if you are working on
            a performance-critical application, you might want to look into more
            advanced benchmarking libraries. One of my favorites that I recently
            found is{" "}
            <Link href="https://github.com/tinylibs/tinybench">Tinybench</Link>.
          </p>
          <H4 title="Tinybench (Typescript/Javascript)" />
          <p>
            Tinybench is built to allow you to check how your code performs in
            any environment with precise timings and comparisons. It even allows
            you to compare different implementations. It's installation and
            usage is pretty simple and for what it is, it's very powerful.
          </p>
          <CodeTag
            languages={{
              typescript: `import { Bench } from 'tinybench';

const bench = new Bench({ name: 'simple benchmark', time: 100 });

bench
  .add('faster task', () => {
    console.log('I am faster');
  })
  .add('slower task', async () => {
    await new Promise((r) => setTimeout(r, 1)); // we wait 1ms :)
    console.log('I am slower');
  });

await bench.run();

console.log(bench.name);
console.table(bench.table());

// Output:
// simple benchmark
// ┌─────────┬───────────────┬────────────────────────────┬───────────────────────────┬──────────────────────┬─────────────────────┬─────────┐
// │ (index) │ Task name     │ Throughput average (ops/s) │ Throughput median (ops/s) │ Latency average (ns) │ Latency median (ns) │ Samples │
// ├─────────┼───────────────┼────────────────────────────┼───────────────────────────┼──────────────────────┼─────────────────────┼─────────┤
// │ 0       │ 'faster task' │ '102906 ± 0.89%'           │ '82217 ± 14'              │ '11909.14 ± 3.95%'   │ '12163.00 ± 2.00'   │ 8398    │
// │ 1       │ 'slower task' │ '988 ± 26.26%'             │ '710'                     │ '1379560.47 ± 6.72%' │ '1408552.00'        │ 73      │
// └─────────┴───────────────┴────────────────────────────┴───────────────────────────┴──────────────────────┴─────────────────────┴─────────┘`,
            }}
          />
          <p>
            With Tinybench you can not only run your code and measure the time
            it takes to run, but you can see if it has a consistent performance
            and compare it to other implementations. It's a powerful tool that I
            have come to love and plan on using in my future projects.
          </p>
          <H4 title="Go benchmark tests" />
          <p>
            Go has an amazing built-in benchmarking tool that you can use to
            test your code. In order to use it you need to write a test file
            with the suffix <code>_test.go</code> and add a function with the
            signature
            <code>Benchmark*</code> to your test file. Here's an example:
          </p>
          <CodeTag
            languages={{
              go: `package main

import (
  "testing"
)

func BenchmarkAddFunction(b *testing.B) {
  for i := 0; i < b.N; i++ {
    return i + i
  }
}`,
              bash: `go test -bench=.`,
            }}
          />
          <p>
            Now with running the bash command, you can see the performance of
            your code. Go will run your code multiple times and give you the
            average time it took to run your code. This is a powerful tool that
            I wish was built-in to other languages as well.
          </p>
          <H3 title="Final thoughts" />
          <p>
            Hopefully, this article has convinced you of the importance of
            benchmarking your code. By benchmarking your code, you can identify
            bottlenecks and optimize your code. You can write complex algorithms
            and make sure they run efficiently. You can test different
            implementations and compare their performance. We talk a lot about
            writing clean code and unit testing, but benchmarking is just as
            important. It's an essential part of software development and it's
            something that every developer should be doing.
          </p>
        </div>
      </div>
    </BlogPostLayout>
  );
}
