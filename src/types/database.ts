export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.18';
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      menu_items: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          id: string;
          image_url: string | null;
          is_popular: boolean;
          name: string;
          price_cents: number;
          venue_id: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string | null;
          is_popular?: boolean;
          name: string;
          price_cents: number;
          venue_id: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string | null;
          is_popular?: boolean;
          name?: string;
          price_cents?: number;
          venue_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_items_venue_id_fkey';
            columns: ['venue_id'];
            isOneToOne: false;
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
        ];
      };
      order_items: {
        Row: {
          id: string;
          menu_item_id: string | null;
          name: string;
          order_id: string;
          quantity: number;
          unit_price_cents: number;
        };
        Insert: {
          id?: string;
          menu_item_id?: string | null;
          name: string;
          order_id: string;
          quantity: number;
          unit_price_cents: number;
        };
        Update: {
          id?: string;
          menu_item_id?: string | null;
          name?: string;
          order_id?: string;
          quantity?: number;
          unit_price_cents?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_menu_item_id_fkey';
            columns: ['menu_item_id'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string;
          customer_id: string;
          id: string;
          number: number;
          spot_hint: string;
          spot_label: string;
          spot_location: unknown;
          spot_photo_path: string | null;
          status: Database['public']['Enums']['order_status'];
          total_cents: number;
          venue_id: string;
        };
        Insert: {
          created_at?: string;
          customer_id: string;
          id?: string;
          number?: never;
          spot_hint?: string;
          spot_label: string;
          spot_location?: unknown;
          spot_photo_path?: string | null;
          status?: Database['public']['Enums']['order_status'];
          total_cents: number;
          venue_id: string;
        };
        Update: {
          created_at?: string;
          customer_id?: string;
          id?: string;
          number?: never;
          spot_hint?: string;
          spot_label?: string;
          spot_location?: unknown;
          spot_photo_path?: string | null;
          status?: Database['public']['Enums']['order_status'];
          total_cents?: number;
          venue_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_venue_id_fkey';
            columns: ['venue_id'];
            isOneToOne: false;
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      venue_staff: {
        Row: {
          user_id: string;
          venue_id: string;
        };
        Insert: {
          user_id: string;
          venue_id: string;
        };
        Update: {
          user_id?: string;
          venue_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'venue_staff_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'venue_staff_venue_id_fkey';
            columns: ['venue_id'];
            isOneToOne: false;
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
        ];
      };
      venues: {
        Row: {
          categories: string[];
          created_at: string;
          delivery_minutes_max: number;
          delivery_minutes_min: number;
          description: string;
          id: string;
          image_url: string | null;
          is_open: boolean;
          location: unknown;
          name: string;
          rating: number | null;
        };
        Insert: {
          categories?: string[];
          created_at?: string;
          delivery_minutes_max: number;
          delivery_minutes_min: number;
          description?: string;
          id?: string;
          image_url?: string | null;
          is_open?: boolean;
          location: unknown;
          name: string;
          rating?: number | null;
        };
        Update: {
          categories?: string[];
          created_at?: string;
          delivery_minutes_max?: number;
          delivery_minutes_min?: number;
          description?: string;
          id?: string;
          image_url?: string | null;
          is_open?: boolean;
          location?: unknown;
          name?: string;
          rating?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_venue_staff: { Args: { venue_id: string }; Returns: boolean };
      nearby_venues: {
        Args: { lat: number; long: number; max_distance_meters?: number };
        Returns: {
          categories: string[];
          delivery_minutes_max: number;
          delivery_minutes_min: number;
          description: string;
          distance_meters: number;
          id: string;
          image_url: string;
          is_open: boolean;
          latitude: number;
          longitude: number;
          name: string;
          rating: number;
        }[];
      };
      place_order: {
        Args: { items: Json; spot: Json; venue: string };
        Returns: {
          created_at: string;
          customer_id: string;
          id: string;
          number: number;
          spot_hint: string;
          spot_label: string;
          spot_location: unknown;
          spot_photo_path: string | null;
          status: Database['public']['Enums']['order_status'];
          total_cents: number;
          venue_id: string;
        };
        SetofOptions: {
          from: '*';
          to: 'orders';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
    };
    Enums: {
      order_status:
        'awaiting_payment' | 'paid' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema['CompositeTypes'] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      order_status: [
        'awaiting_payment',
        'paid',
        'preparing',
        'on_the_way',
        'delivered',
        'cancelled',
      ],
    },
  },
} as const;
