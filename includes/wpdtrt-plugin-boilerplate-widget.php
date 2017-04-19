<?php
/**
 * Generate a widget, which is configured in WP Admin, and can be displayed in sidebars.
 *
 * This file contains PHP.
 *
 * @link       http://www.dotherightthing.co.nz/
 * @since      1.0.0
 *
 * @package    DTRT_Plugin_Boilerplate
 * @subpackage DTRT_Plugin_Boilerplate/includes
 */

/**
 * WP_Widget class
 * This class must be extended for each widget, and WP_Widget::widget() must be overridden.
 * Class names should use capitalized words separated by underscores. Any acronyms should be all upper case.
 * @link https://developer.wordpress.org/reference/classes/wp_widget/
 * @link https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/#naming-conventions
 */
if ( !class_exists( 'WpDTRT_Plugin_Boilerplate_Widget' ) ) {

  class WpDTRT_Plugin_Boilerplate_Widget extends WP_Widget {

    function __construct() {
      // Instantiate the parent object
      parent::__construct( false, 'DTRT Plugin Boilerplate Widget' );
    }

    /**
     * WP_Widget::widget
     * Echoes the widget content to the front-end
     * @param $args (array) (Required) Display arguments including 'before_title', 'after_title', 'before_widget', and 'after_widget'.
     * @param $instance (array) (Required) The settings for the particular instance of the widget.
     * @link https://developer.wordpress.org/reference/classes/wp_widget/widget/
     */
    function widget( $args, $instance ) {

      /**
       * extract
       * 1. predeclare the variables
       * 2. only overwrite the predeclared variables
       * @link http://kb.network.dan/php/wordpress/extract/
       */
      $before_widget = $before_title = $title = $after_title = $after_widget = null;
      extract($args, EXTR_IF_EXISTS);

      /**
       * apply_filters( $tag, $value );
       * Apply the 'widget_title' filter to get the title of the instance.
       * Display the title of this instance, which the user can optionally customise
       */
      $title = apply_filters( 'widget_title', $instance['title'] );
      $num_badges = $instance['num_badges'];
      $display_tooltips = $instance['display_tooltips'];

      $wpdtrt_plugin_boilerplate_options = get_option('wpdtrt_plugin_boilerplate');
      $wpdtrt_data = $wpdtrt_plugin_boilerplate_options['wpdtrt_data'];

    /**
     * Load the HTML template
     * This function's variables will be available to this template.
     */
      require_once(WPDTRT_PLUGIN_BOILERPLATE_PATH . 'public/partials/wpdtrt-plugin-boilerplate-front-end.php');
    }

    /**
     * WP_Widget::update
     * Updates a particular instance of a widget,
     * by replacing the old instance with data from the new instance
     * @param array $new_instance
     * @param array $old_instance
     * @link https://developer.wordpress.org/reference/classes/wp_widget/update/
     */
    function update( $new_instance, $old_instance ) {
      // Save user input (widget options)

      $instance = $old_instance;

      /**
       * strip_tags — Strip HTML and PHP tags from a string
       * @example string strip_tags ( string $str [, string $allowable_tags ] )
       * @link http://php.net/manual/en/function.strip-tags.php
       */
      $instance['title'] = strip_tags( $new_instance['title'] );
      $instance['num_badges'] = strip_tags( $new_instance['num_badges'] );
      $instance['display_tooltips'] = strip_tags( $new_instance['display_tooltips'] );

      return $instance;
    }

    /**
     * WP_Widget::form
     * @param array $instance
     * Outputs the settings update form in wp-admin.
     */
    function form( $instance ) {

      /**
        * Escape HTML attributes to sanitize the data.
        * @example esc_attr( string $text )
        * @link https://developer.wordpress.org/reference/functions/esc_attr/
        */
      $title = esc_attr( $instance['title'] );
      $num_badges = esc_attr( $instance['num_badges'] );
      $display_tooltips = esc_attr( $instance['display_tooltips'] );

      $wpdtrt_plugin_boilerplate_options = get_option('wpdtrt_plugin_boilerplate');
      $wpdtrt_data = $wpdtrt_plugin_boilerplate_options['wpdtrt_data'];

    /**
     * Load the HTML template
     * This function's variables will be available to this template.
     */
      require_once(WPDTRT_PLUGIN_BOILERPLATE_PATH . 'admin/partials/wpdtrt-plugin-boilerplate-widget.php');
    }
  }

}

if ( !function_exists( 'wpdtrt_plugin_boilerplate_register_widgets' ) ) {

  /**
   * register the widget
   * @link https://codex.wordpress.org/Function_Reference/register_widget#Example
   */
  add_action( 'widgets_init', 'wpdtrt_plugin_boilerplate_register_widgets' );

  function wpdtrt_plugin_boilerplate_register_widgets() {
    register_widget( 'WpDTRT_Plugin_Boilerplate_Widget' );
  }

}

?>
