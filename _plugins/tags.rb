module Jekyll

  class SubsectionsForTag < Liquid::For
    NAME = "subsections"
    LEFT_SIDE = "left"
    RIGHT_SIDE = "right"
    BIG = "big"
    GRAPH = "graph"

    def initialize(tag_name, markup, options)
      super
    end

    def render(context)
      filter = context[@attributes['filter']]
      collection = order_reduce_and_filter(context[@collection_name], filter)
      subsections = create_subsections(collection)
      length = subsections.length
      result = []

      context.stack do
        subsections.each_with_index do |subsection, index|
          context[@variable_name] = subsection

          context['forloop'] = {
            'name' => 'directory',
            'length' => length,
            'index' => index + 1,
            'index0' => index,
            'rindex' => length - index,
            'rindex0' => length - index - 1,
            'first' => (index == 0),
            'last' => (index == length - 1)
          }

          result << render_all(@nodelist, context)
        end
      end
      result
    end

    private
    def order_reduce_and_filter(subsections, filter)
      subsections.map { |s| s.data}.select {|s| s['section'] == filter}.group_by{|s| s["order"]}.sort_by{|s| s[0] }
    end

    def create_subsections(collection)
      subsections = Array.new
      collection.each {|row|
        is_two_column = row[1].count > 1
        layout = is_two_column ? "half" : "whole"
        left = get_side(row, LEFT_SIDE)
        right = get_side(row, RIGHT_SIDE)
        whole = row[1].first
        data = (left || right)? [left, right] : [whole]
        subsections << {"layout" => layout, "data"  => data}
      }
      subsections
    end

    def get_side(section, side)
      section[1].select {|s| s.has_key?('split') && s['split'] == side}.first
    end
  end
end

Liquid::Template.register_tag('subsections_for', Jekyll::SubsectionsForTag)