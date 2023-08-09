import _ from 'lodash'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { MenuItem, Select, Typography } from '@material-ui/core'

import { InputLabel } from '@material-ui/core'
import { SlotCategory } from 'gql/schema'

export default function CategoryController() {
  const { control } = useFormContext()
  const label = 'Category'
  const slotCategoryList = SlotCategory
  return (
    <>
      <InputLabel margin="dense" id="category-type-label" variant="outlined">
        {label}
      </InputLabel>
      <Controller
        label={label}
        name="categoryList"
        control={control}
        labelId={'category-type-label'}
        defaultValue=""
        as={
          <Select fullWidth variant="outlined" margin="dense">
            <MenuItem value="" disabled>
              <Typography variant="subtitle2">
                <em>Select {label}</em>
              </Typography>
            </MenuItem>
            {_.map(slotCategoryList, (category, key) => (
              <MenuItem key={key} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                
              </MenuItem>
            ))}
          </Select>
        }
      />
    </>
  )
}
