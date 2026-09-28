type DeliveryTime = "Days" | "Months" | "Weeks";
type PlantsSize = "Xtra Small" | "Small" | "Medium" | "Large" | "XtraLarge";
type Tags = "home" | "shop" | "featured" | "test";

export interface ProductsApiResponse {
    products: {
        availability: boolean
        color: boolean
        deliveryRange: string
        deliveryTime: DeliveryTime
        id: string
        petFriendly: boolean
        plantColour: {
            id: string
            colours: string[]
        }
        plantSize: {
            id: string
            plantSizes: PlantsSize[]
        }
        price: number
        productInfo: string
        qty: number
        slug: string
        sun: string
        tags: Tags
        title: string
        water: string
        thumbnail: {
            fileName: string
            id: string
            url: string
        }[]
    }[]
};

export type ProductUI = Omit<ProductsApiResponse["products"][number], "plantColour" | "plantSize"> & {
  plantColour: string[]
  plantSize: PlantsSize[]
  imageUrl: string
};

export const mapProducts = (data: ProductsApiResponse['products'][number]): ProductUI => ({
    availability: data.availability ?? false,
    color: data.color ?? false,
    deliveryRange: data.deliveryRange ?? "",
    deliveryTime: data.deliveryTime ?? "Days",
    id: data.id ?? crypto.randomUUID(),
    petFriendly: data.petFriendly ?? false,
    plantColour: data.plantColour.colours ?? [],
    plantSize: data.plantSize.plantSizes ?? "Medium",
    price: data.price ?? 0,
    productInfo: data.productInfo ?? "",
    qty: data.qty ?? 0,
    slug: data.slug ?? "",
    sun: data.sun ?? "",
    tags: data.tags ?? "Shop",
    title: data.title ?? "", 
    water: data.water ?? "",
    thumbnail: data.thumbnail ?? [],
    imageUrl: data.thumbnail?.[0]?.url ?? ""
});

export const productQuery = `query ProductsQuery {
  products {
    availability
    color
    deliveryRange
    deliveryTime
    id
    petFriendly
    plantColour {
      ... on PlantColour {
        id
        plantColour
      }
    }
    plantSize {
      id
      plantSizes
    }
    price
    productInfo
    qty
    slug
    sun
    tags
    title
    water
    thumbnail {
      fileName
      id
      url
    }
  }
}`

export function mapProduct(raw: {products: Parameters<typeof mapProducts>[0][]}) {
    return raw.products.map(mapProducts);
}

