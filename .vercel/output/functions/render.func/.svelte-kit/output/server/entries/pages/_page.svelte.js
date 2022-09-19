import { c as create_ssr_component, e as escape, v as validate_component, d as each, f as add_attribute } from "../../chunks/index.js";
import "@solana/web3.js";
const loader_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '@keyframes svelte-9q93wt-loader-animation{0%{opacity:0.2;transform:scale(1, 1)}50%{opacity:1;transform:scale(1.25)}100%{opacity:0.2;transform:scale(1, 1)}}.loader.svelte-9q93wt{position:relative;--duration:600}.dot.svelte-9q93wt{content:"";--size:0.5rem;border-radius:100%;width:var(--size);height:var(--size);background-color:var(--color-text);animation:svelte-9q93wt-loader-animation 1000ms infinite ease-in-out;margin:0 0.2rem}.dot.svelte-9q93wt:nth-child(1){animation-delay:333ms}.dot.svelte-9q93wt:nth-child(2){animation-delay:666ms}',
  map: null
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let remSize;
  const sizes = { small: 0.4, medium: 0.6, large: 1 };
  let { size = "medium" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css$1);
  remSize = `${sizes[size]}rem`;
  return `
<div class="${"loader display-flex svelte-9q93wt"}"><div class="${"dot svelte-9q93wt"}" style="${"--size:" + escape(remSize, true)}"></div>
    <div class="${"dot svelte-9q93wt"}" style="${"--size:" + escape(remSize, true)}"></div>
    <div class="${"dot svelte-9q93wt"}" style="${"--size:" + escape(remSize, true)}"></div>
</div>`;
});
const nft_svelte_svelte_type_style_lang = "";
const css = {
  code: ".nft-card.svelte-1xnp1e0{position:relative;padding-bottom:100%;background-size:cover;background-position:center}.msg.svelte-1xnp1e0{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)}",
  map: null
};
const Nft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { nft = { data: { uri: "" }, mint: "" } } = $$props;
  let metada = { image: "" };
  if ($$props.nft === void 0 && $$bindings.nft && nft !== void 0)
    $$bindings.nft(nft);
  $$result.css.add(css);
  return `<a class="${"nft-card border-radius flex-center link no-decoration svelte-1xnp1e0"}" style="${"background-image: url('" + escape(metada.image, true) + "')"}" href="${"https://solscan.io/token/" + escape(nft.mint, true)}" target="${"_blank"}"><div class="${"msg svelte-1xnp1e0"}">${`${`${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}`}`}</div></a>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let address = "";
  let error = "";
  let nfts = [];
  {
    console.log("NFTs", { nfts });
  }
  return `<main class="${"container"}"><div class="${"row flex-center"}"><div class="${"col-12 col-lg-6 display-flex flex-column align-items-center"}"><div><img src="${"sol.png"}" height="${"100"}"></div>   
            <h2 class="${"text-center"}">Wallet Explorer</h2></div></div>
    ${nfts.length ? `<div class="${"row"}">${each(nfts, (nft) => {
    return `<div class="${"col-6 col-lg-4"}">${validate_component(Nft, "NFT").$$render($$result, { nft }, {}, {})}
                </div>`;
  })}</div>` : ``}
    <div class="${"row flex-center"}"><div class="${"col-12 col-lg-6"}"><input class="${"input mb-3 w-100"}" type="${"text"}" placeholder="${"Wallet"}"${add_attribute("value", address, 0)}>
            <button class="${"button button-green w-100 flex-center mb-2"}">${`Go`}</button>
            <a class="${"button w-100 flex-center mb-2"}" href="${"https://github.com/qudo-code/solana-wallet-explorer"}" target="${"_blank"}">GitHub
            </a>
            <i class="${"text-gold"}">${escape(error)}</i></div></div>
</main>`;
});
export {
  Page as default
};
