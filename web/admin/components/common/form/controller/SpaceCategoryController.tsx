import _ from 'lodash'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { MenuItem, Select, Typography, SelectProps } from '@material-ui/core'

import { SpaceCategory } from 'gql/schema'
import { InputLabel } from '@material-ui/core'

export default function SpaceCategoryController() {
  const { control } = useFormContext()
  const label = 'Category'
  const spaceCategoryList = SpaceCategory
  return (
    <>
      <InputLabel margin="dense" id="category-type-label" variant="outlined">
        {label}
      </InputLabel>
      <Controller
        label={label}
        name="category"
        control={control}
        labelId={'category-type-label'}
        as={
          <Select fullWidth variant="outlined" margin="dense">
            <MenuItem value="" disabled>
              <Typography variant="subtitle2">
                <em>Select {label}</em>
              </Typography>
            </MenuItem>
            {_.map(Object.values(spaceCategoryList), (category, key) => (
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
