 import { RichTextContent } from "@graphcms/rich-text-types";
 
 export interface StoresApiResponse {
    stores: {
        addAnnouncement: boolean
        addDirections: boolean
        address: boolean
        directions: {
            latitude: string | number
            longitude: string | number
        }
        email: string
        id: string
        phone: number | string
        slug: string
        specialAnnouncement: {
            html: string
            markdown: string
            raw: string
            text: RichTextContent
        }
        storeImage: {
            fileName: string
            id: string
            url: string
        }
        storeName: string
        storeOperations: {
            closingTime: number | string
            id: string
            openingTime: number | string
            storeDay: string
        }
        newTab: boolean
    }[]
}

export type StoreUI = Omit<StoresApiResponse["stores"][number], "directions" | "specialAnnouncement" | "storeImage" | "storeOperations"> & {
    latitude: string | number
    longitude: string | number
    announcement: RichTextContent
    image: string
    storeDay: string
    storeOpening: number | string
    storeClosing: number | string
}

export const mapStores = (data: StoresApiResponse["stores"][number]): StoreUI => ({
    addAnnouncement: data.addAnnouncement ?? false,
    addDirections: data.addDirections ?? false,
    address: data.address ?? false,
    latitude: data.directions.latitude ?? "",
    longitude: data.directions.longitude ?? "",
    email: data.email ?? "",
    id: data.id ?? crypto.randomUUID(),
    phone: data.phone ?? "",
    slug: data.slug ?? "",
    announcement: data.specialAnnouncement.text ?? "",
    image: data.storeImage.url ?? "",
    storeName: data.storeName ?? "",
    storeDay: data.storeOperations.storeDay ?? "",
    storeOpening: data.storeOperations.openingTime ?? "",
    storeClosing: data.storeOperations.closingTime ?? "",
    newTab: data.newTab ?? false
});

const storeQuery = `query StoresQuery {
  stores {
    addAnnouncement
    addDirections
    address
    directions {
      latitude
      longitude
    }
    email
    id
    phone
    slug
    specialAnnouncement {
      html
      markdown
      raw
      text
    }
    storeImage {
      fileName
      id
      url
    }
    storeName
    storeOperations {
      closingTime
      id
      openingTime
      storeDay
    }
    newTab
  }
}`

export { storeQuery };

