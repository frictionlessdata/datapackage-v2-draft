import { docsSchema } from "@astrojs/starlight/schema"
import { defineCollection } from "astro:content"
import { blogSchema } from "starlight-blog/schema"

// import { i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: context => blogSchema(context),
    }),
  }),
  // i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
}
