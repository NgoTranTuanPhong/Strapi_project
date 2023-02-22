'use strict';

/**
 * posts-report service
 */

module.exports = {
  postsReport: async () => {
    try {
      // fetching data
      const entries = await strapi.entityService.findMany(
        "api::article.article",
        {
          fields: ["id", "title","authorEmail", "publishedDate"],
          populate: {
            users: {
              fields: ["username", "email"],
            },
            category: {
              fields: ["name"],
            },
          },
        }
      );
        console.log(entries, 'entries')
      // reduce the data to the format we want to return
      let entriesReduced;
      if (entries && Array.isArray(entries)) {
        entriesReduced = entries.reduce((acc, item) => {
          acc = acc || [];
          acc.push({
            id: item.id,
            title: item.title || "",
            category: item.category.name || "",
            publishedDate: new Date(item.publishedDate).toDateString() || "",
            authorName: item.users?.username || "",
            authorEmail: item.users?.email || "",
          });
          return acc;
        }, []);
      }

      // return the reduced data
      return entriesReduced;
    } catch (err) {
      return err;
    }
  },
};
