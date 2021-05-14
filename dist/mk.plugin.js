// makeify plugins

function mkBlog(editor) {
   // Define a new custom component
   const text = 'Headers test'
   const dateText = '3 Hours Ago'

   editor.Components.addType('mk-blog', {
      model: {
         defaults: {
            // Make the editor understand when to bind `my-blog-type`
            isComponent: (el) => el.tagName === 'div',
            attributes: {
               class: 'mk_blog',
            },
            style: { padding: '40px' },
            traits: [
               {
                  type: 'checkbox',
                  name: 'showDate',
                  label: 'Show Date',
                  changeProp: 1,
               },
               {
                  type: 'checkbox',
                  name: 'showTitle',
                  label: 'Show Title',
                  changeProp: 1,
               },
               {
                  type: 'select', // Type of the trait
                  label: 'Select Blog', // The label you will see in Settings
                  name: 'blogType', // The name of the attribute/property to use on component
                  options: [
                     { id: 'blog1', name: 'Blog 1' },
                     { id: 'blog2', name: 'Blog 2' },
                     { id: 'blog3', name: 'Blog 3' },
                  ],
               },
               {
                  type: 'button',
                  text: 'Submit',
                  full: true, // Full width button
                  command: (editor) => {
                     const component = editor.getSelected()
                     const dateNodes = component.find('.mk_blog_date')
                     const titleNodes = component.find('.mk_blog_title')

                     const dateTrait = component.getTrait('showDate')
                     const titleTrait = component.getTrait('showTitle')
                     const blogTrait = component.getTrait('blogType')

                     const { value: showDate } = dateTrait.props()
                     const { value: showTitle } = titleTrait.props()
                     const { value: blogTraitValue } = blogTrait.props()

                     console.log(blogTraitValue)

                     const blogNodes = component.find(`.${blogTraitValue}`)[0]
                     console.log(blogNodes)

                     if (!showDate) {
                        dateNodes.forEach((node) =>
                           node.setStyle({
                              display: 'none',
                           })
                        )
                     }

                     if (showDate) {
                        dateNodes.forEach((node) =>
                           node.setStyle({
                              display: 'initial',
                           })
                        )
                     }

                     if (!showTitle) {
                        titleNodes.forEach((node) =>
                           node.setStyle({
                              display: 'none',
                           })
                        )
                     }

                     if (showTitle) {
                        titleNodes.forEach((node) =>
                           node.setStyle({
                              display: 'initial',
                           })
                        )
                     }
                  },
               },
            ],
            showDate: 'checked',
            showTitle: 'checked',
            components: {
               tagName: 'section',
               attributes: {
                  class: 'blog-section py-5',
               },
               components: {
                  attributes: {
                     class: 'container',
                  },
                  components: [
                     {
                        attributes: {
                           class: 'head-box text-center mb-5',
                        },
                        components: `
                         <h2>Our Blog Post</h2>
                         <h6 className="text-underline-primary">This is blog panel</h6>
                         <div className="text-underline"></div>
                      `,
                     },
                     {
                        attributes: { class: 'row' },
                        components: {
                           attributes: { class: 'col col-xs-12' },
                           components: {
                              attributes: {
                                 class: 'blog-grids',
                                 style:
                                    'display: flex; justify-content: space-between',
                              },
                              components: [
                                 getMkBlogs({ text, dateText, uuid: 1 }),
                                 getMkBlogs({ text, dateText, uuid: 2 }),
                                 getMkBlogs({ text, dateText, uuid: 3 }),
                              ],
                           },
                        },
                     },
                  ],
               },
            },
         },
      },
   })

   // Create a block for the component, so we can drop it easily
   editor.Blocks.add('mk-blog', {
      label: 'Makeify Blog',
      media:
         '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
      attributes: { class: 'fa fa-text' },
      content: { type: 'mk-blog' },
   })
}

function getMkBlogs({ text, dateText, uuid } = {}) {
   return {
      attributes: { class: `grid blog${uuid}` },
      components: [
         {
            attributes: { class: 'entry-media' },
            components: {
               tagName: 'img',
               type: 'image',
            },
         },
         {
            attributes: { class: 'entry-body' },
            components: [
               {
                  tagName: 'span',
                  attributes: { class: 'mk_blog_category category cat' },
                  content: 'inspiration',
                  traits: setBlogTrait({ label: 'Show Category' }),
                  showTitle: 'checked',
                  value: 'inspiration',
               },
               {
                  tagName: 'h3',
                  components: {
                     tagName: 'a',
                     attributes: {
                        class: 'mk_blog_title blog__title',
                     },
                     content: text,
                     traits: setBlogTrait({ label: 'Show Title' }),
                     showTitle: 'checked',
                     value: text,
                  },
               },
               {
                  attributes: {
                     class: 'read-more-date',
                  },
                  components: [
                     `<a href="#">Read More...</a>`,
                     {
                        tagName: 'span',
                        attributes: {
                           class: 'mk_blog_date date',
                        },
                        content: dateText,
                        traits: setBlogTrait({ label: 'Show Date' }),
                        showTitle: 'checked',
                        value: dateText,
                     },
                  ],
               },
            ],
         },
      ],
   }
}

// function with named parameters
function setBlogTrait({ label, textContent = 'Text Content' } = {}) {
   return [
      {
         type: 'checkbox',
         name: 'showTitle',
         label,
         changeProp: 1,
      },
      {
         type: 'text',
         name: 'value',
         label: textContent,
         changeProp: 1,
      },
      {
         type: 'button',
         text: 'Submit',
         full: true, // Full width button
         command: (editor) => {
            const component = editor.getSelected()
            const [target] = component.getClasses()
            const selectedNodes = component
               .closest('.blog-grids')
               .find(`.${target}`)

            const trait = component.getTrait('showTitle')
            const textContentTrait = component.getTrait('value')

            const { value: showTitle } = trait.props()

            if (textContentTrait.props().value) {
               component.empty()
               component.append(textContentTrait.props().value)
            }
            if (!showTitle) {
               selectedNodes.forEach((node) =>
                  node.setStyle({
                     display: 'none',
                  })
               )
            }
            if (showTitle) {
               selectedNodes.forEach((node) =>
                  node.setStyle({
                     display: 'initial',
                  })
               )
            }
         },
      },
   ]
}
