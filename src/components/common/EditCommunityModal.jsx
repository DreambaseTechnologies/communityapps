import {
  useEffect,
  useState,
} from 'react'

import Button from '../ui/Button'
import ImageUpload from '../ui/ImageUpload'
import Input from '../ui/Input'
import Modal from '../ui/Modal'

function EditCommunityModal({
  open,
  community,
  onClose,
  onSave,
}) {
  const [name, setName] = useState('')
  const [slogan, setSlogan] = useState('')
  const [location, setLocation] = useState('')

  const [logo, setLogo] =
    useState(null)

  const [banner, setBanner] =
    useState(null)

  const [errors, setErrors] =
    useState({})

  useEffect(() => {
    if (!open || !community) {
      return
    }

    setName(community.name ?? '')
    setSlogan(community.slogan ?? '')
    setLocation(community.location ?? '')

    setLogo(
      community.logo ?? null,
    )

    setBanner(
      community.banner ?? null,
    )

    setErrors({})
  }, [open, community])

  const validate = () => {
    const nextErrors = {}

    if (!name.trim()) {
      nextErrors.name =
        'Community name wajib diisi.'
    }

    if (name.trim().length > 100) {
      nextErrors.name =
        'Community name maksimal 100 karakter.'
    }

    if (slogan.trim().length > 150) {
      nextErrors.slogan =
        'Slogan maksimal 150 karakter.'
    }

    if (location.trim().length > 100) {
      nextErrors.location =
        'Location maksimal 100 karakter.'
    }

    setErrors(nextErrors)

    return (
      Object.keys(nextErrors).length === 0
    )
  }

  const handleSubmit = (
    event,
  ) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    onSave?.({
      ...community,

      name: name.trim(),

      slogan: slogan.trim(),

      location: location.trim(),

      logo:
        logo?.preview ??
        logo ??
        null,

      banner:
        banner?.preview ??
        banner ??
        null,

      logoFile:
        logo?.file ??
        null,

      bannerFile:
        banner?.file ??
        null,
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Community"
      description="Perbarui identitas dan informasi dasar community."
      size="lg"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <section>
          <div className="mb-4">
            <h3 className="text-sm font-extrabold text-slate-950">
              Community Identity
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Gunakan logo dan banner yang merepresentasikan community.
            </p>
          </div>

          <div className="space-y-5">
            <ImageUpload
              label="Community Logo"
              value={
                typeof logo === 'string'
                  ? logo
                  : logo?.preview ?? null
              }
              onChange={setLogo}
              variant="square"
            />

            <ImageUpload
              label="Community Banner"
              value={
                typeof banner === 'string'
                  ? banner
                  : banner?.preview ?? null
              }
              onChange={setBanner}
              variant="banner"
            />
          </div>
        </section>

        <div className="border-t border-slate-100" />

        <section>
          <div className="mb-4">
            <h3 className="text-sm font-extrabold text-slate-950">
              Basic Information
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Informasi ini akan ditampilkan pada halaman community.
            </p>
          </div>

          <div className="space-y-5">
            <Input
              label="Community Name"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value,
                )
              }
              placeholder="Contoh: Garuda FC Community"
              required
              error={errors.name}
              maxLength={100}
            />

            <Input
              label="Slogan"
              value={slogan}
              onChange={(event) =>
                setSlogan(
                  event.target.value,
                )
              }
              placeholder="Contoh: One Community. One Passion."
              error={errors.slogan}
              maxLength={150}
              helperText="Optional. Maksimal 150 karakter."
            />

            <Input
              label="Location"
              value={location}
              onChange={(event) =>
                setLocation(
                  event.target.value,
                )
              }
              placeholder="Contoh: Balikpapan"
              error={errors.location}
              maxLength={100}
              helperText="Optional. Lokasi utama community."
            />
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditCommunityModal