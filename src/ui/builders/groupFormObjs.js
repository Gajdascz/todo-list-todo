import { buildElementTree, createCustomSelectObj } from '../../logic/utility/domHelperFunctions';
import { buildElementTre } from '../../logic/utility/domHelperFunctions';


const newGroupInput = () => {
  return { type: 'label',
           attributes: {for: id},
           children: [
            { type: 'input',
              attributes: { type: 'text',
              id: id,
              class: 'new-group-dialog-form-input',
              placeholder,
              required,
              value: value ? value : ''
              }
            }
           ]
  }
}


const createTextInputObj = ({id, identifier, value=null, placeholder=null, required=false}) => {
  return { type: 'label', 
           attributes: {for: id}, 
            children: [
              { type: 'input', 
                attributes: { type: 'text', 
                              id: id, 
                              class: `task-dialog-form-text-input task-dialog-form-${identifier}-input`, 
                              placeholder,
                              required,
                              value: value ? value : ''
                            }
              }
            ]
          }
};