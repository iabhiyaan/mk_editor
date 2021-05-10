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

// rendering using component
function dynamicBlog(editor) {
   // Define a new custom component
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
                  content: 'Headers test',
                  removable: false, // Can't remove it
                  draggable: false, // Can't move it
                  copyable: false,
                  traits: [
                     {
                        type: 'checkbox',
                        name: 'show__title',
                        label: 'Show Title',
                        changeProp: 1,
                     },
                     {
                        type: 'button',
                        text: 'Submit',
                        full: true, // Full width button
                        command: editor => {
                           const component = editor.getSelected()
                           const trait = component.getTrait('show__title')
                           const { value } = trait.props()
                           if (!value) {
                              const components = editor.getComponents()
                              components.forEach(component => {
                                 component.find('h1')[0].remove()
                              })
                           }
                        },
                     },
                  ],
                  show__title: 'checked',
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
