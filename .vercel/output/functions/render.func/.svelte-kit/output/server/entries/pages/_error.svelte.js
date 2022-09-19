import { g as getContext, c as create_ssr_component, b as subscribe, e as escape } from "../../chunks/index.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  const readonly_stores = {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    updated: stores.updated
  };
  Object.defineProperties(readonly_stores, {
    preloading: {
      get() {
        console.error("stores.preloading is deprecated; use stores.navigating instead");
        return {
          subscribe: stores.navigating.subscribe
        };
      },
      enumerable: false
    },
    session: {
      get() {
        removed_session();
        return {};
      },
      enumerable: false
    }
  });
  return readonly_stores;
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function removed_session() {
  throw new Error(
    "stores.session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
  );
}
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="${"container"}"><div class="${"row"}"><div class="${"col-12"}"><div class="${"card"}"><h2>Uh Oh</h2>
                <p>Looks like something went wrong. You can return to the home page to restart the app.</p>
                <a class="${"button button-green"}" href="${"/"}">Back Home</a></div></div>
        <div class="${"col-12"}"><div class="${"card"}"><h3>Error</h3>
                <strong>Report Error</strong>
                <p class="${"mt-0 text-micro"}">If you&#39;d like to help us make Matr better, copy the orange error below and share it with our devs in Discord so we can be sure to get it fixed.</p>
                <p class="${"text-gold"}">${escape($page.error.message)}</p></div></div></div></div>`;
});
export {
  Error$1 as default
};
