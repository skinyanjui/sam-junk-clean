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
          sort_order?: number
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
          category: string
          content: string
          created_at: string
          date: string
          excerpt: string
          id: string
          image_url: string
          is_featured: boolean | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          date: string
          excerpt: string
          id?: string
          image_url: string
          is_featured?: boolean | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          image_url?: string
          is_featured?: boolean | null
          slug?: string
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
          sort_order?: number
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
      company_info: {
        Row: {
          created_at: string
          id: string
          key: string
          section: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          section: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          section?: string
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
      included_services: {
        Row: {
          created_at: string
          description: string | null
          icon: string
          id: string
          section: string
          service_name: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon: string
          id?: string
          section?: string
          service_name: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          section?: string
          service_name?: string
          sort_order?: number
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          additional_info: string | null
          availability: Json
          created_at: string
          education: Json | null
          employment_history: Json | null
          id: string
          legal_requirements: Json
          personal_info: Json
          position_id: string
          position_title: string
          resume_info: Json
          skills: Json | null
          status: string
          updated_at: string
        }
        Insert: {
          additional_info?: string | null
          availability: Json
          created_at?: string
          education?: Json | null
          employment_history?: Json | null
          id?: string
          legal_requirements: Json
          personal_info: Json
          position_id: string
          position_title: string
          resume_info: Json
          skills?: Json | null
          status?: string
          updated_at?: string
        }
        Update: {
          additional_info?: string | null
          availability?: Json
          created_at?: string
          education?: Json | null
          employment_history?: Json | null
          id?: string
          legal_requirements?: Json
          personal_info?: Json
          position_id?: string
          position_title?: string
          resume_info?: Json
          skills?: Json | null
          status?: string
          updated_at?: string
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
          sort_order?: number
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
      locations: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          description: string | null
          id: number
          image_url: string | null
          is_primary: boolean | null
          name: string
          primary_city: string
          service_areas: string[] | null
          service_radius: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_primary?: boolean | null
          name: string
          primary_city: string
          service_areas?: string[] | null
          service_radius?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_primary?: boolean | null
          name?: string
          primary_city?: string
          service_areas?: string[] | null
          service_radius?: string | null
        }
        Relationships: []
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
          sort_order?: number
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
      quote_requests: {
        Row: {
          add_on_services: Json | null
          address: string
          city: string
          contact_preference: string | null
          created_at: string
          description: string | null
          email: string
          id: string
          image_url: string | null
          job_type: string
          name: string
          phone: string
          pricing_tier_id: string | null
          same_day: boolean | null
          service_date: string | null
          status: string
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          add_on_services?: Json | null
          address: string
          city: string
          contact_preference?: string | null
          created_at?: string
          description?: string | null
          email: string
          id?: string
          image_url?: string | null
          job_type: string
          name: string
          phone: string
          pricing_tier_id?: string | null
          same_day?: boolean | null
          service_date?: string | null
          status?: string
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          add_on_services?: Json | null
          address?: string
          city?: string
          contact_preference?: string | null
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          image_url?: string | null
          job_type?: string
          name?: string
          phone?: string
          pricing_tier_id?: string | null
          same_day?: boolean | null
          service_date?: string | null
          status?: string
          updated_at?: string
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
