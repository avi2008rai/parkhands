import _ from 'lodash'
import { useFormContext, Controller } from 'react-hook-form'
import { MenuItem, Select, Typography, SelectProps, FormHelperText } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { useUser } from 'components/hooks/useUser'
import { useMyParkingSpacesListQuery } from 'gql/schema'

export default function SpaceNameController({ labelId }: Pick<SelectProps, 'labelId'>) {
  
  const label = 'Space Name'
  const { userId } = useUser()
  const { data } = useMyParkingSpacesListQuery({
    variables: {
      ownerId: userId,
    },
  })
  const { errors, control } = useFormContext()
  return (
    <>
      <InputLabel margin="dense" id="space-name-label" required variant="outlined">
        {label}
      </InputLabel>
      
      <Controller
        label={label}
        name="parkingSpaceId"
        control={control}
        labelId={labelId}
        error={Boolean(errors.parkingSpaceId)}
        helperText={errors.parkingSpaceId?.message}
        as={
          <Select fullWidth variant="outlined" margin="dense">
            <MenuItem value="" disabled>
              <Typography variant="subtitle2">
                <em>Select {label}</em>
              </Typography>
            </MenuItem>
            {data !== undefined
              ? _.map(data['parkingSpacesList'], (parkingSpace) => (
                  <MenuItem key={parkingSpace.id} value={parkingSpace.id}>
                    {parkingSpace.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        }
      />
      <FormHelperText variant="outlined" error={Boolean(errors.parkingSpaceId)}>
        {errors.parkingSpaceId?.message}
      </FormHelperText>
    </>
  )
}
