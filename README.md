This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
pages/index.js              getStaticProps getServerSideProps 使用
pages/[meetupId]/index.js   getStaticPaths feedback参数 使用

getServerSideProps 更好还是 getStaticProps 更好？

getServerSideProps 可能听起来更好

因为它保证为每个请求运行。

但这实际上可能是一个缺点，

因为这意味着你需要等待你的页面

在每个传入的请求上生成。

现在，如果你没有一直在变化的数据，

有了这个，我的意思是

它每秒更改多次。

如果您不需要访问请求对象，

假设进行身份验证，

getStaticProps 实际上更好。

因为您在那里预先生成了一个 HTML 文件，

然后可以通过 CDN 存储和提供该文件。

这简直比再生更快

并为每个传入请求获取该数据。

所以你的页面在工作时会更快

使用 getStaticProps，因为那样它可以被缓存

并重复使用，而不是一直重新生成。

因此，你真的应该只使用 getServerSideProps

如果您需要访问该具体请求对象，

因为你无权请求

并在 getStaticProps 中响应。

或者如果你真的有数据

每秒变化多次，

那么因此即使重新验证也无济于事，

那么 getServerSideProps 是一个不错的选择。

不过，现在这里是我们的聚会清单，

这不是一个很好的选择，因为那不是数据，

经常变化。

在这里我也不需要工作

与传入的请求。

因此，我将再次评论 getServerSideprops，

并评论 getStaticProps 。

因为这样，我们可以利用缓存

而且我们不会多次重新生成页面，

不必要的。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
