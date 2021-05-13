// rendering statically by using html tags
function inputForm(editor) {
   editor.BlockManager.add('input', {
      label: 'Input',
      media:
         '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
      content: '<input />',
   })
   // input component
   // this is not component -> for traits
   editor.DomComponents.addType('input', {
      isComponent: el => el.tagName == 'INPUT',
      model: {
         defaults: {
            traits: [
               // Strings are automatically converted to text types
               {
                  type: 'text',
                  label: 'Name',
                  name: 'name',
               },
               'placeholder',
               {
                  type: 'select', // Type of the trait
                  label: 'Type', // The label you will see in Settings
                  name: 'type', // The name of the attribute/property to use on component
                  options: [
                     { id: 'text', name: 'Text' },
                     { id: 'email', name: 'Email' },
                     { id: 'password', name: 'Password' },
                     { id: 'number', name: 'Number' },
                  ],
               },
               {
                  type: 'checkbox',
                  name: 'required',
               },
               {
                  type: 'button',
                  text: 'Submit',
                  full: true, // Full width button
                  command: editor => {
                     const component = editor.getSelected()
                     const nameTrait = component.getTrait('name').props()
                  },
               },
            ],
            // As by default, traits are binded to attributes, so to define
            // their initial value we can use attributes
            attributes: { type: 'text', required: true },
         },
      },
   })
}

function textAreaForm(editor) {
   editor.BlockManager.add('textarea', {
      label: 'Textarea',
      media:
         '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7.5c0-.9-.5-1.5-1.3-1.5H3.4C2.5 6 2 6.6 2 7.5v9c0 .9.5 1.5 1.3 1.5h17.4c.8 0 1.3-.6 1.3-1.5v-9zM21 17H3V7h18v10z"/><path d="M4 8h1v4H4zM19 7h1v10h-1zM20 8h1v1h-1zM20 15h1v1h-1z"/></svg>',
      content: '<textarea></textarea>',
   })
   // textarea component
   editor.DomComponents.addType('textarea', {
      isComponent: el => el.tagName == 'TEXTAREA',
      model: {
         defaults: {
            traits: [
               // Strings are automatically converted to text types
               'name',
               'placeholder',
            ],
            // As by default, traits are binded to attributes, so to define
            // their initial value we can use attributes
            attributes: { type: 'text', required: true },
         },
      },
   })
}

// rendering using component
function dynamicInput(editor) {
   // Define a new custom component
   editor.Components.addType('custom-input', {
      model: {
         defaults: {
            // Make the editor understand when to bind `my-input-type`
            isComponent: el => el.tagName === 'INPUT',
            tagName: 'input',
            traits: [
               // Strings are automatically converted to text types
               {
                  type: 'text',
                  label: 'Name',
                  name: 'name',
               },
               'placeholder',
               {
                  type: 'select', // Type of the trait
                  label: 'Type', // The label you will see in Settings
                  name: 'type', // The name of the attribute/property to use on component
                  options: [
                     { id: 'text', name: 'Text' },
                     { id: 'email', name: 'Email' },
                     { id: 'password', name: 'Password' },
                     { id: 'number', name: 'Number' },
                  ],
               },
               {
                  type: 'checkbox',
                  name: 'required',
               },
            ],
         },
      },
   })

   // Create a block for the component, so we can drop it easily
   editor.Blocks.add('input', {
      label: 'Input',
      media:
         '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
      attributes: { class: 'fa fa-text' },
      content: { type: 'custom-input' },
   })
}

function dynamicBlog(editor) {
   // Define a new custom component
   const text = 'Headers test'

   editor.Components.addType('custom-blog', {
      model: {
         defaults: {
            // Make the editor understand when to bind `my-blog-type`
            isComponent: el => el.tagName === 'div',
            tagName: 'div',
            // Can be a string
            components: [
               {
                  tagName: 'h1',
                  type: 'text',
                  content: text,
                  attributes: {
                     class: 'heading',
                  },
                  traits: [
                     {
                        type: 'checkbox',
                        name: 'show__title',
                        label: 'Show Title',
                        changeProp: 1,
                     },
                     {
                        type: 'text',
                        name: 'value',
                        label: 'Value',
                        changeProp: 1,
                     },
                     {
                        type: 'button',
                        text: 'Submit',
                        full: true, // Full width button
                        command: editor => {
                           const component = editor.getSelected()

                           const trait = component.getTrait('show__title')
                           const textContentTrait = component.getTrait('value')
                           const { value } = trait.props()
                           if (
                              textContentTrait.props().value ||
                              textContentTrait.props().value == ''
                           ) {
                              component.empty()
                              component.append(textContentTrait.props().value)
                           }
                           if (!value) {
                              const components = editor.getComponents()
                              components.forEach(component => {
                                 component
                                    .find('h1')[0]
                                    .setAttributes({ style: 'display:none' })
                              })
                           }
                           if (value) {
                              const components = editor.getComponents()
                              components.forEach(component => {
                                 component
                                    .find('h1')[0]
                                    .setAttributes({ style: 'display:block' })
                              })
                           }
                        },
                     },
                  ],
                  show__title: 'checked',
                  value: text,
               },
               '<p>Paragraph test</p>',
            ],
            style: {
               padding: '20px',
            },
         },
      },
   })
   // Create a block for the component, so we can drop it easily
   editor.Blocks.add('custom-blog', {
      label: 'Custom Blog',
      media:
         '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
      attributes: { class: 'fa fa-text' },
      content: { type: 'custom-blog' },
   })
}

// makeify plugins

function mkBlog(editor) {
   // Define a new custom component
   const text = 'Headers test'
   const dateText = '3 Hours Ago'

   editor.Components.addType('mk-blog', {
      model: {
         defaults: {
            // Make the editor understand when to bind `my-blog-type`
            isComponent: el => el.tagName === 'div',
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
                                 getMkBlogs(text, dateText),
                                 getMkBlogs(text, dateText),
                                 getMkBlogs(text, dateText),
                              ],
                           },
                        },
                     },
                  ],
               },
            },
            style: { padding: '40px' },
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

function getMkBlogs(text, dateText) {
   return {
      attributes: { class: 'grid' },
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
                  attributes: { class: 'cat category' },
                  content: 'inspiration',
                  traits: setBlogTrait('Show Category', '.category'),
                  show__title: 'checked',
                  value: 'inspiration',
               },
               {
                  tagName: 'h3',
                  components: {
                     tagName: 'a',
                     attributes: {
                        class: 'blog__title',
                     },
                     content: text,
                     traits: setBlogTrait('Show Title', '.blog__title'),
                     show__title: 'checked',
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
                           class: 'date',
                        },
                        content: dateText,
                        traits: setBlogTrait('Show Date', '.date'),
                        show__title: 'checked',
                        value: dateText,
                     },
                  ],
               },
            ],
         },
      ],
   }
}

function setBlogTrait(label, el) {
   return [
      {
         type: 'checkbox',
         name: 'show__title',
         label,
         changeProp: 1,
      },
      {
         type: 'text',
         name: 'value',
         label: 'Text Content',
         changeProp: 1,
      },
      {
         type: 'button',
         text: 'Submit',
         full: true, // Full width button
         command: editor => {
            const component = editor.getSelected()
            const selectedNodes = component.closest('.blog-grids').find(el)

            const trait = component.getTrait('show__title')
            const textContentTrait = component.getTrait('value')

            const { value: showTitle } = trait.props()

            if (textContentTrait.props().value) {
               component.empty()
               component.append(textContentTrait.props().value)
            }
            if (!showTitle) {
               selectedNodes.forEach(node =>
                  node.setAttributes({
                     style: 'display:none',
                  })
               )
            }
            if (showTitle) {
               selectedNodes.forEach(node =>
                  node.setAttributes({
                     style: 'display:initial',
                  })
               )
            }
         },
      },
   ]
}
