export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      add_on_services: {
        Row: {
          created_at: string
          description: string | null
          fee_display: string
          id: string
          max_fee: number | null
          min_fee: number
          service_name: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          fee_display: string
          id?: string
          max_fee?: number | null
          min_fee: number
          service_name: string
          sort_order: number
        }
        Update: {
          created_at?: string
          description?: string | null
          fee_display?: string
          id?: string
          max_fee?: number | null
          min_fee?: number
          service_name?: string
          sort_order?: number
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string
          category: string | null
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category?: string | null
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      booking_requests: {
        Row: {
          created_at: string
          date: string
          email: string
          id: string
          name: string
          notes: string | null
          phone: string
          service: string
          status: string
          time: string
        }
        Insert: {
          created_at?: string
          date: string
          email: string
          id?: string
          name: string
          notes?: string | null
          phone: string
          service: string
          status?: string
          time: string
        }
        Update: {
          created_at?: string
          date?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string
          service?: string
          status?: string
          time?: string
        }
        Relationships: []
      }
      booking_time_slots: {
        Row: {
          created_at: string
          id: string
          is_available: boolean
          sort_order: number
          time_slot: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_available?: boolean
          sort_order: number
          time_slot: string
        }
        Update: {
          created_at?: string
          id?: string
          is_available?: boolean
          sort_order?: number
          time_slot?: string
        }
        Relationships: []
      }
      company_benefits: {
        Row: {
          color_class: string
          created_at: string
          description: string
          icon: string
          id: string
          sort_order: number | null
          title: string
        }
        Insert: {
          color_class: string
          created_at?: string
          description: string
          icon: string
          id?: string
          sort_order?: number | null
          title: string
        }
        Update: {
          color_class?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      company_info: {
        Row: {
          created_at: string
          id: string
          key: string
          section: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          section: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          section?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      company_stats: {
        Row: {
          created_at: string
          id: string
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      faq_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category_id: string | null
          created_at: string
          id: string
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          category_id?: string | null
          created_at?: string
          id?: string
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          category_id?: string | null
          created_at?: string
          id?: string
          question?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "faqs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "faq_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      featured_projects: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string
          location: string
          sort_order: number | null
          tags: string[]
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image_url: string
          location: string
          sort_order?: number | null
          tags: string[]
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          location?: string
          sort_order?: number | null
          tags?: string[]
          title?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          additional_info: string | null
          availability: Json
          created_at: string
          education: Json
          employment_history: Json
          id: string
          legal_requirements: Json
          personal_info: Json
          position_id: string
          position_title: string
          resume_info: Json
          skills: Json
          status: string | null
        }
        Insert: {
          additional_info?: string | null
          availability: Json
          created_at?: string
          education: Json
          employment_history: Json
          id?: string
          legal_requirements: Json
          personal_info: Json
          position_id: string
          position_title: string
          resume_info: Json
          skills: Json
          status?: string | null
        }
        Update: {
          additional_info?: string | null
          availability?: Json
          created_at?: string
          education?: Json
          employment_history?: Json
          id?: string
          legal_requirements?: Json
          personal_info?: Json
          position_id?: string
          position_title?: string
          resume_info?: Json
          skills?: Json
          status?: string | null
        }
        Relationships: []
      }
      job_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          created_at: string
          has_dropdown: boolean
          id: string
          is_active: boolean
          name: string
          parent_id: string | null
          path: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          has_dropdown?: boolean
          id?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
          path: string
          sort_order: number
        }
        Update: {
          created_at?: string
          has_dropdown?: boolean
          id?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
          path?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "navigation_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "navigation_items"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_tiers: {
        Row: {
          created_at: string
          description: string
          fill_level: string
          fill_percentage: number
          id: string
          max_price: number
          min_price: number
          price_display: string
          sort_order: number
          tier_name: string
        }
        Insert: {
          created_at?: string
          description: string
          fill_level: string
          fill_percentage: number
          id?: string
          max_price: number
          min_price: number
          price_display: string
          sort_order: number
          tier_name: string
        }
        Update: {
          created_at?: string
          description?: string
          fill_level?: string
          fill_percentage?: number
          id?: string
          max_price?: number
          min_price?: number
          price_display?: string
          sort_order?: number
          tier_name?: string
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          color_class: string
          created_at: string
          description: string
          id: string
          number: string
          sort_order: number | null
          title: string
        }
        Insert: {
          color_class: string
          created_at?: string
          description: string
          id?: string
          number: string
          sort_order?: number | null
          title: string
        }
        Update: {
          color_class?: string
          created_at?: string
          description?: string
          id?: string
          number?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          add_on_services: Json | null
          address: string
          city: string
          contact_preference: string
          created_at: string
          description: string
          email: string
          id: string
          image_url: string | null
          job_type: string
          name: string
          phone: string
          pricing_tier_id: string | null
          same_day: boolean | null
          status: string | null
          user_id: string
          zip_code: string | null
        }
        Insert: {
          add_on_services?: Json | null
          address: string
          city: string
          contact_preference: string
          created_at?: string
          description: string
          email: string
          id?: string
          image_url?: string | null
          job_type: string
          name: string
          phone: string
          pricing_tier_id?: string | null
          same_day?: boolean | null
          status?: string | null
          user_id: string
          zip_code?: string | null
        }
        Update: {
          add_on_services?: Json | null
          address?: string
          city?: string
          contact_preference?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          image_url?: string | null
          job_type?: string
          name?: string
          phone?: string
          pricing_tier_id?: string | null
          same_day?: boolean | null
          status?: string | null
          user_id?: string
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_pricing_tier_id_fkey"
            columns: ["pricing_tier_id"]
            isOneToOne: false
            referencedRelation: "pricing_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      related_blogs: {
        Row: {
          blog_slug: string
          blog_title: string
          created_at: string
          id: string
          service_id: string
        }
        Insert: {
          blog_slug: string
          blog_title: string
          created_at?: string
          id?: string
          service_id: string
        }
        Update: {
          blog_slug?: string
          blog_title?: string
          created_at?: string
          id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_service"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["service_id"]
          },
        ]
      }
      related_services: {
        Row: {
          created_at: string
          id: string
          related_service_id: string
          service_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          related_service_id: string
          service_id: string
        }
        Update: {
          created_at?: string
          id?: string
          related_service_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_related_service"
            columns: ["related_service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["service_id"]
          },
          {
            foreignKeyName: "fk_service"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["service_id"]
          },
        ]
      }
      service_locations: {
        Row: {
          contact_email: string
          contact_phone: string
          created_at: string
          description: string
          id: string
          image_url: string
          is_primary: boolean
          name: string
          primary_city: string
          service_areas: string[]
          service_radius: string
          sort_order: number | null
        }
        Insert: {
          contact_email: string
          contact_phone: string
          created_at?: string
          description: string
          id?: string
          image_url: string
          is_primary?: boolean
          name: string
          primary_city: string
          service_areas: string[]
          service_radius: string
          sort_order?: number | null
        }
        Update: {
          contact_email?: string
          contact_phone?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          is_primary?: boolean
          name?: string
          primary_city?: string
          service_areas?: string[]
          service_radius?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      service_zip_codes: {
        Row: {
          city: string
          created_at: string
          id: string
          is_serviced: boolean
          state: string
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          is_serviced?: boolean
          state: string
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          is_serviced?: boolean
          state?: string
          zip_code?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          image: string
          items: string[]
          service_id: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          image: string
          items: string[]
          service_id: string
          sort_order: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          image?: string
          items?: string[]
          service_id?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content: string
          created_at: string
          id: string
          key: string
          section: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          key: string
          section: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          key?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          id: string
          location: string
          name: string
          quote: string
          rating: number
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          name: string
          quote: string
          rating: number
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          name?: string
          quote?: string
          rating?: number
          sort_order?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
