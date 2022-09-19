# 🎨 Clean Azz Styles 
Base styles + utils + custom grid system I carry with me to new projects.

### Add To Project
1. Download to `./styles`: `npx degit github.com:qudo-code/template--scss styles`
2. Reference in your entrypoint: `import "./styles/main.scss"`

## 🛠 Config
`src/main.scss`

Setup reset/normalize type things as well as project CSS vars.

## 😅 [WIP] Build Media Queries
`src/mixin.build-media-queries.scss`

_This hasn't been extensively tested but seems mostly solid._

See examples of it's usage in `src/_display.scss`.

This mixins goal is to build all responsive classes for a certain class. For example, turn `.p-2` into `.p-sm-2`, `.p-md-2`, and `.p-lg-2`.

## 🚀 Available Classes
A dictionary of all available classes. View the contents of the files to learn more.

### Animations
```
.animation-fade-in
.animation-ripple
```
  
### Background
```
.background-white
.background-light-gray
.background-gray
.background-dark
.background-black
.background-green
.background-purple
.background-blue
.background-theme
.background-gold
```

### Border
```
.border
.border-radius
.border-radius-less
.border-radius-less
.border-gold
.border-green
.border-purple
```

### Buttons
```
.buttons
.button-disabled
.button-outline
.button-light
.button-green
.button-blue
.button-theme
.button-outline-green
.button-red
.tabs
```

### Display
```
.display-flex
.display-block
.display-none
.display-[sm-lg]-flex
.display-[sm-lg]-block
.display-[sm-lg]-none
```

### Flex
```
.display-flex
.flex-center
.flex-between
.flex-center-end
.flex-center-start 
.vert-space
.justify-content-start
.justify-content-center
.justify-content-end
.justify-content-space-between
.align-items-start
.align-items-center
.align-items-end
.flex-row
.flex-row-rev
.flex-column
.flex-col-rev
.justify-content-[sm-lg]-end
.justify-content-[sm-lg]-center
```

### Forms
```
.input
```

### Grid
Always follow this pattern (container, row, then column)
```html
<div class="container">
    <div class="row">
        <div class="col"></div>
    </div>
</div>
```
```
.container
.row
.col
.col-[1-12]
.col-[sm-lg]-[1-12]
```

### Icon
```
.icon
.icon-gold
```

### Link
```
.no-decoration
```

### Opacity
```
.opacity-100
.opacity-50
.opacity-0
.opacity-[sm-lg]-100
.opacity-[sm-lg]-0
```

### Size
`$spacer` set in `main.scss`
```scss
$spacing-values: (
    0: 0,
    1: ($spacer * .04) + rem,
    2: ($spacer * .075) + rem,
    3: ($spacer * .1) + rem,
    4: ($spacer * .15) + rem,
    5: ($spacer * .2) + rem,
);
```
```
.w-100
.w-75
.w-50
.w-25
.h-100
.w-[sm-lg]-100
.w-[sm-lg]-50
```

### Spacing
```
.p-[1-5]
.py-[1-5]
.px-[1-5]
.pl-[1-5]
.pt-[1-5]
.pr-[1-5]
.pb-[1-5]
.p-[sm-lg]-[1-5]
.py-[sm-lg]-[1-5]
.px-[sm-lg]-[1-5]
.pl-[sm-lg]-[1-5]
.pt-[sm-lg]-[1-5]
.pr-[sm-lg]-[1-5]
.pb-[sm-lg]-[1-5]
.m-[1-5]
.my-[1-5]
.mx-[1-5]
.ml-[1-5]
.mt-[1-5]
.mr-[1-5]
.mb-[1-5]
.m-[sm-lg]-[1-5]
.my-[sm-lg]-[1-5]
.mx-[sm-lg]-[1-5]
.ml-[sm-lg]-[1-5]
.mt-[sm-lg]-[1-5]
.mr-[sm-lg]-[1-5]
.mb-[sm-lg]-[1-5]
```
# Text
```
.text-micro
.font-weight-light
.font-weight-regular
.font-weight-medium
.font-weight-bold
.text-blue
.text-light
.text-primary
.text-dark
.text-gold
.text-green
.text-purple
.text-blue
.text-theme
.word-wrap
```

